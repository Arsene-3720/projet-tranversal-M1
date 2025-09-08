const TypeIncident = require("../models/TypeIncident");

// Créer un type d'incident
exports.createTypeIncident = async (req, res) => {
  try {
    const typeIncident = new TypeIncident(req.body);
    await typeIncident.save();
    res.status(201).json(typeIncident);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Lire tous les types d'incidents
exports.getTypeIncidents = async (req, res) => {
  try {
    const types = await TypeIncident.find();
    res.json(types);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lire un type d'incident par ID
exports.getTypeIncidentById = async (req, res) => {
  try {
    const typeIncident = await TypeIncident.findById(req.params.id);
    if (!typeIncident) return res.status(404).json({ message: "Type d'incident non trouvé" });
    res.json(typeIncident);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour un type d'incident
exports.updateTypeIncident = async (req, res) => {
  try {
    const typeIncident = await TypeIncident.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!typeIncident) return res.status(404).json({ message: "Type d'incident non trouvé" });
    res.json(typeIncident);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer un type d'incident
exports.deleteTypeIncident = async (req, res) => {
  try {
    const typeIncident = await TypeIncident.findByIdAndDelete(req.params.id);
    if (!typeIncident) return res.status(404).json({ message: "Type d'incident non trouvé" });
    res.json({ message: "Type d'incident supprimé" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
