const Alerte = require("../models/Alerte");

// Créer une alerte
exports.createAlerte = async (req, res) => {
  try {
    const alerte = new Alerte(req.body);
    await alerte.save();
    res.status(201).json(alerte);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Lire toutes les alertes
exports.getAlertes = async (req, res) => {
  try {
    const alertes = await Alerte.find();
    res.json(alertes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lire une alerte par ID
exports.getAlerteById = async (req, res) => {
  try {
    const alerte = await Alerte.findById(req.params.id);
    if (!alerte) return res.status(404).json({ message: "Alerte non trouvée" });
    res.json(alerte);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour une alerte
exports.updateAlerte = async (req, res) => {
  try {
    const alerte = await Alerte.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!alerte) return res.status(404).json({ message: "Alerte non trouvée" });
    res.json(alerte);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer une alerte
exports.deleteAlerte = async (req, res) => {
  try {
    const alerte = await Alerte.findByIdAndDelete(req.params.id);
    if (!alerte) return res.status(404).json({ message: "Alerte non trouvée" });
    res.json({ message: "Alerte supprimée" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
