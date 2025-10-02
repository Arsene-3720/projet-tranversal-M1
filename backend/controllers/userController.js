const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dataSource = require("../data-source"); // exporte une DataSource initialisée

const ALLOWED_ROLES = ["admin","operateur","citoyen","analyste","superadmin"];
const ADMIN_ROLE = "admin";
const CITOYEN_ROLE = "citoyen";
const SALT_ROUNDS = 12;

const userRepo = () => dataSource.getRepository("User");
const typeIncidentRepo = () => dataSource.getRepository("TypeIncident");

const sanitize = (u) => {
  if (!u) return u;
  const { password, ...rest } = u;
  return rest;
};

const handleDupKey = (err, res) => {
  // Postgres duplicate key
  if (err && (err.code === "23505")) {
    return res.status(409).json({ message: "Conflit d'unicité (ex: email déjà utilisé)." });
  }
  return res.status(400).json({ error: err.message });
};

// ===== Admin CRUD =====
exports.createAdmin = async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    if (!password) return res.status(400).json({ message: "Mot de passe requis." });

    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    const toSave = userRepo().create({ ...rest, role: ADMIN_ROLE, password: hashed });
    const saved = await userRepo().save(toSave);
    // recharger sans password (car column select:false)
    const admin = await userRepo().findOne({ where: { id: saved.id } });
    res.status(201).json(sanitize(admin));
  } catch (err) { return handleDupKey(err, res); }
};

exports.getAdmins = async (_req, res) => {
  try { res.json(await userRepo().find({ where: { role: ADMIN_ROLE } })); }
  catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getAdminById = async (req, res) => {
  try {
    const admin = await userRepo().findOne({ where: { id: req.params.id, role: ADMIN_ROLE } });
    if (!admin) return res.status(404).json({ message: "Administrateur non trouvé" });
    res.json(admin);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.updateAdmin = async (req, res) => {
  try {
    const { password, role, ...rest } = req.body;
    if (role && role !== ADMIN_ROLE) return res.status(400).json({ message: "Changement de rôle interdit." });

    const admin = await userRepo().findOne({ where: { id: req.params.id, role: ADMIN_ROLE }, withDeleted: false, select: ["id","nom","email","role"] });
    if (!admin) return res.status(404).json({ message: "Administrateur non trouvé" });

    if (password) rest.password = await bcrypt.hash(password, SALT_ROUNDS);
    await userRepo().update(admin.id, rest);
    const updated = await userRepo().findOne({ where: { id: admin.id } });
    res.json(sanitize(updated));
  } catch (err) { return handleDupKey(err, res); }
};

exports.deleteAdmin = async (req, res) => {
  try {
    const result = await userRepo().delete({ id: req.params.id, role: ADMIN_ROLE });
    if (!result.affected) return res.status(404).json({ message: "Administrateur non trouvé" });
    res.json({ message: "Administrateur supprimé" });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// ===== Auth =====
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // comme password a select:false, on doit explicitement le sélectionner
    const qb = userRepo().createQueryBuilder("u")
      .addSelect("u.password")
      .where("u.email = :email AND u.role = :role", { email, role: ADMIN_ROLE });
    const admin = await qb.getOne();

    if (!admin) return res.status(401).json({ message: "Administrateur non trouvé" });
    const ok = await bcrypt.compare(password, admin.password || "");
    if (!ok) return res.status(401).json({ message: "Mot de passe incorrect" });

    const token = jwt.sign({ sub: String(admin.id), role: admin.role }, process.env.JWT_SECRET, { expiresIn: "12h" });
    res.json({ token, admin: sanitize(admin) });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// ===== “Méthodes UML” adaptées =====
exports.gererUtilisateurs = async (_req, res) => {
  try { res.json(await userRepo().find({ where: { role: CITOYEN_ROLE } })); }
  catch (err) { res.status(500).json({ error: err.message }); }
};

exports.gererTypesIncident = async (_req, res) => {
  try { res.json(await typeIncidentRepo().find()); }
  catch (err) { res.status(500).json({ error: err.message }); }
};

// ===== Endpoints génériques =====
exports.createUser = async (req, res) => {
  try {
    const { password, role = CITOYEN_ROLE, ...rest } = req.body;
    if (!password) return res.status(400).json({ message: "Mot de passe requis." });
    if (!ALLOWED_ROLES.includes(role)) return res.status(400).json({ message: `Rôle invalide (${ALLOWED_ROLES.join(", ")})` });

    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    const created = await userRepo().save(userRepo().create({ ...rest, role, password: hashed }));
    const user = await userRepo().findOne({ where: { id: created.id } });
    res.status(201).json(sanitize(user));
  } catch (err) { return handleDupKey(err, res); }
};

exports.getUsers = async (req, res) => {
  try {
    const where = req.query.role ? { role: req.query.role } : {};
    res.json(await userRepo().find({ where }));
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await userRepo().findOne({ where: { id: req.params.id } });
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.json(user);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.updateUser = async (req, res) => {
  try {
    const { password, role, ...rest } = req.body;
    if (role && !ALLOWED_ROLES.includes(role)) {
      return res.status(400).json({ message: `Rôle invalide (${ALLOWED_ROLES.join(", ")})` });
    }
    const existing = await userRepo().findOne({ where: { id: req.params.id }, select: ["id"] });
    if (!existing) return res.status(404).json({ message: "Utilisateur non trouvé" });

    const update = { ...rest };
    if (role) update.role = role;
    if (password) update.password = await bcrypt.hash(password, SALT_ROUNDS);

    await userRepo().update(existing.id, update);
    const user = await userRepo().findOne({ where: { id: existing.id } });
    res.json(sanitize(user));
  } catch (err) { return handleDupKey(err, res); }
};

exports.deleteUser = async (req, res) => {
  try {
    const result = await userRepo().delete(req.params.id);
    if (!result.affected) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.json({ message: "Utilisateur supprimé" });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const qb = userRepo().createQueryBuilder("u").addSelect("u.password").where("u.email = :email", { email });
    const user = await qb.getOne();
    if (!user) return res.status(401).json({ message: "Utilisateur non trouvé" });

    const ok = await bcrypt.compare(password, user.password || "");
    if (!ok) return res.status(401).json({ message: "Mot de passe incorrect" });

    const token = jwt.sign({ sub: String(user.id), role: user.role }, process.env.JWT_SECRET, { expiresIn: "12h" });
    res.json({ token, user: sanitize(user) });
  } catch (err) { res.status(500).json({ error: err.message }); }
};
