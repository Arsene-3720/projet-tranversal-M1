const Operateur = require("../models/Operateur");

// CRUD
exports.createOperateur = async (req, res) => {
  try {
    const operateur = new Operateur(req.body);
    await operateur.save();
    res.status(201).json(operateur);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getOperateurs = async (req, res) => {
  try {
    const operateurs = await Operateur.find();
    res.json(operateurs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOperateurById = async (req, res) => {
  try {
    const operateur = await Operateur.findById(req.params.id);
    if (!operateur) return res.status(404).json({ message: "Opérateur non trouvé" });
    res.json(operateur);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOperateur = async (req, res) => {
  try {
    const operateur = await Operateur.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!operateur) return res.status(404).json({ message: "Opérateur non trouvé" });
    res.json(operateur);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteOperateur = async (req, res) => {
  try {
    const operateur = await Operateur.findByIdAndDelete(req.params.id);
    if (!operateur) return res.status(404).json({ message: "Opérateur non trouvé" });
    res.json({ message: "Opérateur supprimé" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Méthodes UML
exports.qualifierIncident = async (req, res) => {
  try {
    const operateur = await Operateur.findById(req.params.id);
    if (!operateur) return res.status(404).json({ message: "Opérateur non trouvé" });

    res.json({ message: operateur.qualifierIncident(req.body.incidentId) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.assignerUnite = async (req, res) => {
  try {
    const operateur = await Operateur.findById(req.params.id);
    if (!operateur) return res.status(404).json({ message: "Opérateur non trouvé" });

    res.json({ message: operateur.assignerUnite(req.body.uniteId) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
