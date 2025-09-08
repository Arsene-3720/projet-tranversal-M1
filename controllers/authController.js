const Administrateur = require("../models/Administrateur");
const Operateur = require("../models/Operateur");
const Citoyen = require("../models/Citoyen");
const Analyste = require("../models/Analyste");
const jwt = require("jsonwebtoken");

// Fonction générique pour générer un token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// ------------------- ADMIN -------------------
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Administrateur.findOne({ email });
    if (!admin) return res.status(401).json({ message: "Email ou mot de passe incorrect" });

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: "Email ou mot de passe incorrect" });

    const token = generateToken(admin._id);
    res.json({ token, admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ------------------- OPERATEUR -------------------
exports.loginOperateur = async (req, res) => {
  const { email, password } = req.body;
  try {
    const op = await Operateur.findOne({ email });
    if (!op) return res.status(401).json({ message: "Email ou mot de passe incorrect" });

    const isMatch = await op.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: "Email ou mot de passe incorrect" });

    const token = generateToken(op._id);
    res.json({ token, operateur: op });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ------------------- CITOYEN -------------------
exports.loginCitoyen = async (req, res) => {
  const { email, password } = req.body;
  try {
    const citoyen = await Citoyen.findOne({ email });
    if (!citoyen) return res.status(401).json({ message: "Email ou mot de passe incorrect" });

    const isMatch = await citoyen.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: "Email ou mot de passe incorrect" });

    const token = generateToken(citoyen._id);
    res.json({ token, citoyen });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ------------------- ANALYSTE -------------------
exports.loginAnalyste = async (req, res) => {
  const { email, password } = req.body;
  try {
    const analyste = await Analyste.findOne({ email });
    if (!analyste) return res.status(401).json({ message: "Email ou mot de passe incorrect" });

    const isMatch = await analyste.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: "Email ou mot de passe incorrect" });

    const token = generateToken(analyste._id);
    res.json({ token, analyste });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/////////////////////////////////////////////////////// REGISTER 

// ------------------- ADMIN -------------------
exports.registerAdmin = async (req, res) => {
    try {
      const admin = new Administrateur(req.body);
      await admin.save();
      const token = generateToken(admin._id);
      res.status(201).json({ token, admin });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // ------------------- OPERATEUR -------------------
  exports.registerOperateur = async (req, res) => {
    try {
      const op = new Operateur(req.body);
      await op.save();
      const token = generateToken(op._id);
      res.status(201).json({ token, operateur: op });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // ------------------- CITOYEN -------------------
  exports.registerCitoyen = async (req, res) => {
    try {
      const citoyen = new Citoyen(req.body);
      await citoyen.save();
      const token = generateToken(citoyen._id);
      res.status(201).json({ token, citoyen });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // ------------------- ANALYSTE -------------------
  exports.registerAnalyste = async (req, res) => {
    try {
      const analyste = new Analyste(req.body);
      await analyste.save();
      const token = generateToken(analyste._id);
      res.status(201).json({ token, analyste });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
