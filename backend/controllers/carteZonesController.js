const CarteZones = require("../models/CarteZones");

// Créer une zone
exports.createZone = async (req, res) => {
  try {
    const zone = new CarteZones(req.body);
    await zone.save();
    res.status(201).json(zone);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Lire toutes les zones
exports.getZones = async (req, res) => {
  try {
    const zones = await CarteZones.find();
    res.json(zones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lire une zone par ID
exports.getZoneById = async (req, res) => {
  try {
    const zone = await CarteZones.findById(req.params.id);
    if (!zone) return res.status(404).json({ message: "Zone non trouvée" });
    res.json(zone);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour une zone
exports.updateZone = async (req, res) => {
  try {
    const zone = await CarteZones.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!zone) return res.status(404).json({ message: "Zone non trouvée" });
    res.json(zone);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer une zone
exports.deleteZone = async (req, res) => {
  try {
    const zone = await CarteZones.findByIdAndDelete(req.params.id);
    if (!zone) return res.status(404).json({ message: "Zone non trouvée" });
    res.json({ message: "Zone supprimée" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
