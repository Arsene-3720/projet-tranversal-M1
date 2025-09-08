const UniteTerrain = require("../models/UniteTerrain");
const Incident = require("../models/Incident");

// Créer une unité de terrain
exports.createUnite = async (req, res) => {
  try {
    const unite = new UniteTerrain(req.body);
    await unite.save();
    res.status(201).json(unite);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Lire toutes les unités
exports.getUnites = async (req, res) => {
  try {
    const unites = await UniteTerrain.find().populate("incidentAssocie");
    res.json(unites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lire une unité par ID
exports.getUniteById = async (req, res) => {
  try {
    const unite = await UniteTerrain.findById(req.params.id).populate("incidentAssocie");
    if (!unite) return res.status(404).json({ message: "Unité non trouvée" });
    res.json(unite);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour une unité
exports.updateUnite = async (req, res) => {
  try {
    const unite = await UniteTerrain.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!unite) return res.status(404).json({ message: "Unité non trouvée" });
    res.json(unite);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer une unité
exports.deleteUnite = async (req, res) => {
  try {
    const unite = await UniteTerrain.findByIdAndDelete(req.params.id);
    if (!unite) return res.status(404).json({ message: "Unité non trouvée" });
    res.json({ message: "Unité supprimée" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* === MÉTHODES UML === */

// Effectuer une intervention
exports.effectuerIntervention = async (req, res) => {
  try {
    const { id, incidentId } = req.params;

    const unite = await UniteTerrain.findById(id);
    if (!unite) return res.status(404).json({ message: "Unité non trouvée" });

    const incident = await Incident.findById(incidentId);
    if (!incident) return res.status(404).json({ message: "Incident non trouvé" });

    unite.statut = "en intervention";
    unite.incidentAssocie = incidentId;
    await unite.save();

    incident.statut = "en cours";
    await incident.save();

    res.json({ message: "Intervention en cours", unite, incident });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Clôturer un incident
exports.cloturerIncident = async (req, res) => {
  try {
    const { id } = req.params;

    const unite = await UniteTerrain.findById(id).populate("incidentAssocie");
    if (!unite) return res.status(404).json({ message: "Unité non trouvée" });

    if (!unite.incidentAssocie) {
      return res.status(400).json({ message: "Aucun incident associé à cette unité" });
    }

    unite.statut = "incident clôturé";
    await unite.save();

    unite.incidentAssocie.statut = "clôturé";
    await unite.incidentAssocie.save();

    res.json({ message: "Incident clôturé avec succès", unite, incident: unite.incidentAssocie });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
