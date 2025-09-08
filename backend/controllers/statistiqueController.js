const Statistique = require("../models/Statistique");

// Créer une statistique
exports.createStatistique = async (req, res) => {
  try {
    const statistique = new Statistique(req.body);
    await statistique.save();
    res.status(201).json(statistique);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Lire toutes les statistiques
exports.getStatistiques = async (req, res) => {
  try {
    const stats = await Statistique.find();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lire une statistique par ID
exports.getStatistiqueById = async (req, res) => {
  try {
    const statistique = await Statistique.findById(req.params.id);
    if (!statistique) return res.status(404).json({ message: "Statistique non trouvée" });
    res.json(statistique);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour une statistique
exports.updateStatistique = async (req, res) => {
  try {
    const statistique = await Statistique.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!statistique) return res.status(404).json({ message: "Statistique non trouvée" });
    res.json(statistique);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer une statistique
exports.deleteStatistique = async (req, res) => {
  try {
    const statistique = await Statistique.findByIdAndDelete(req.params.id);
    if (!statistique) return res.status(404).json({ message: "Statistique non trouvée" });
    res.json({ message: "Statistique supprimée" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
