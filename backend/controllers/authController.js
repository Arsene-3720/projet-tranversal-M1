const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Fonction pour générer un token JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

// ------------------- REGISTER -------------------
router.post("/register", async (req, res) => {
  try {
    const { nom, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email déjà utilisé" });

    const user = new User({ nom, email, password, role });
    await user.save();

    const token = generateToken(user);

    res.status(201).json({
      message: "Inscription réussie",
      user: { id: user._id, nom: user.nom, email: user.email, role: user.role },
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ------------------- LOGIN -------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Requête login reçue:", req.body);

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Utilisateur non trouvé" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: "Mot de passe incorrect" });

    const token = generateToken(user);

    res.json({
      message: "Connexion réussie",
      user: { id: user._id, nom: user.nom, email: user.email, role: user.role },
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
