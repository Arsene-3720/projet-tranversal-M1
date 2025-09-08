const Incident = require("../models/Incident");

// Créer un incident
exports.createIncident = async (req, res) => {
  try {
    const incident = new Incident(req.body);
    await incident.save();
    res.status(201).json(incident);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Lire tous les incidents
exports.getIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find();
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lire un incident par ID
exports.getIncidentById = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) return res.status(404).json({ message: "Incident non trouvé" });
    res.json(incident);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour un incident
exports.updateIncident = async (req, res) => {
  try {
    const incident = await Incident.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!incident) return res.status(404).json({ message: "Incident non trouvé" });
    res.json(incident);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer un incident
exports.deleteIncident = async (req, res) => {
  try {
    const incident = await Incident.findByIdAndDelete(req.params.id);
    if (!incident) return res.status(404).json({ message: "Incident non trouvé" });
    res.json({ message: "Incident supprimé" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
