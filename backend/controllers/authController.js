// controllers/authController.js (TypeORM)
const jwt = require('jsonwebtoken');
const { User } = require('../entities/user.entity');

const generateToken = (user) =>
  jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

async function register(req, res) {
  try {
    const { nom, email, password, role } = req.body;
    const repo = req.ds.getRepository(User);
    const exists = await repo.findOne({ where: { email } });
    if (exists) return res.status(400).json({ error: 'Email déjà utilisé' });

    const user = repo.create({ nom, email, password, role }); // hash via subscriber
    await repo.save(user);

    const token = generateToken(user);
    res.status(201).json({ message: 'Inscription réussie', user: { id: user.id, nom: user.nom, email: user.email, role: user.role }, token });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const repo = req.ds.getRepository(User);
    const user = await repo.createQueryBuilder('u').addSelect('u.password').where('u.email = :email', { email }).getOne();
    if (!user) return res.status(400).json({ error: 'Utilisateur non trouvé' });

    const ok = await user.comparePassword(password);
    if (!ok) return res.status(400).json({ error: 'Mot de passe incorrect' });

    const token = generateToken(user);
    res.json({ message: 'Connexion réussie', user: { id: user.id, nom: user.nom, email: user.email, role: user.role }, token });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = { register, login };
