const Administrateur = require("../models/Administrateur");
const Citoyen = require("../models/Citoyen");
const TypeIncident = require("../models/TypeIncident");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// =================== CRUD Administrateur ===================

// Créer un administrateur
exports.createAdmin = async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Administrateur({ ...rest, password: hashedPassword });
    await admin.save();
    res.status(201).json(admin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Lire tous les administrateurs
exports.getAdmins = async (req, res) => {
  try {
    const admins = await Administrateur.find().select("-password");
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lire un administrateur par ID
exports.getAdminById = async (req, res) => {
  try {
    const admin = await Administrateur.findById(req.params.id).select("-password");
    if (!admin) return res.status(404).json({ message: "Administrateur non trouvé" });
    res.json(admin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour un administrateur
exports.updateAdmin = async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    if (password) {
      rest.password = await bcrypt.hash(password, 10);
    }
    const admin = await Administrateur.findByIdAndUpdate(req.params.id, rest, { new: true });
    if (!admin) return res.status(404).json({ message: "Administrateur non trouvé" });
    res.json(admin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer un administrateur
exports.deleteAdmin = async (req, res) => {
  try {
    const admin = await Administrateur.findByIdAndDelete(req.params.id);
    if (!admin) return res.status(404).json({ message: "Administrateur non trouvé" });
    res.json({ message: "Administrateur supprimé" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// =================== Authentification ===================

// Login administrateur
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Administrateur.findOne({ email });
    if (!admin) return res.status(401).json({ message: "Administrateur non trouvé" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Mot de passe incorrect" });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, admin: { id: admin._id, nom: admin.nom, email: admin.email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// =================== Méthodes UML ===================

// Gérer les utilisateurs (liste des citoyens)
exports.gererUtilisateurs = async (req, res) => {
  try {
    const citoyens = await Citoyen.find();
    res.json(citoyens);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Gérer les types d'incidents (liste)
exports.gererTypesIncident = async (req, res) => {
  try {
    const types = await TypeIncident.find();
    res.json(types);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
