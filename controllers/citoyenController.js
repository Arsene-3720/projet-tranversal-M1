const Citoyen = require("../models/Citoyen");

// CRUD
exports.createCitoyen = async (req, res) => {
  try {
    const citoyen = new Citoyen(req.body);
    await citoyen.save();
    res.status(201).json(citoyen);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCitoyens = async (req, res) => {
  try {
    const citoyens = await Citoyen.find();
    res.json(citoyens);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCitoyenById = async (req, res) => {
  try {
    const citoyen = await Citoyen.findById(req.params.id);
    if (!citoyen) return res.status(404).json({ message: "Citoyen non trouvé" });
    res.json(citoyen);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCitoyen = async (req, res) => {
  try {
    const citoyen = await Citoyen.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!citoyen) return res.status(404).json({ message: "Citoyen non trouvé" });
    res.json(citoyen);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCitoyen = async (req, res) => {
  try {
    const citoyen = await Citoyen.findByIdAndDelete(req.params.id);
    if (!citoyen) return res.status(404).json({ message: "Citoyen non trouvé" });
    res.json({ message: "Citoyen supprimé" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Méthodes UML
exports.peutSignaler = async (req, res) => {
  const citoyen = await Citoyen.findById(req.params.id);
  if (!citoyen) return res.status(404).json({ message: "Citoyen non trouvé" });
  res.json({ message: citoyen.peutSignaler() });
};

exports.consulterCarte = async (req, res) => {
  const citoyen = await Citoyen.findById(req.params.id);
  if (!citoyen) return res.status(404).json({ message: "Citoyen non trouvé" });
  res.json({ message: citoyen.consulterCarte() });
};
