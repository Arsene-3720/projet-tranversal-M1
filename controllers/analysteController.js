const Analyste = require("../models/Analyste");
const Incident = require("../models/Incident");
const Statistique = require("../models/Statistique");

// Créer un analyste
exports.createAnalyste = async (req, res) => {
  try {
    const analyste = new Analyste(req.body);
    await analyste.save();
    res.status(201).json(analyste);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Lire tous les analystes
exports.getAnalystes = async (req, res) => {
  try {
    const analystes = await Analyste.find();
    res.json(analystes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lire un analyste par ID
exports.getAnalysteById = async (req, res) => {
  try {
    const analyste = await Analyste.findById(req.params.id);
    if (!analyste) return res.status(404).json({ message: "Analyste non trouvé" });
    res.json(analyste);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour un analyste
exports.updateAnalyste = async (req, res) => {
  try {
    const analyste = await Analyste.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!analyste) return res.status(404).json({ message: "Analyste non trouvé" });
    res.json(analyste);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer un analyste
exports.deleteAnalyste = async (req, res) => {
  try {
    const analyste = await Analyste.findByIdAndDelete(req.params.id);
    if (!analyste) return res.status(404).json({ message: "Analyste non trouvé" });
    res.json({ message: "Analyste supprimé" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* === MÉTHODES UML === */

// Analyser les données (par type d'incident)
exports.analyserDonnees = async (req, res) => {
  try {
    const resultats = await Incident.aggregate([
      { $group: { _id: "$type", total: { $sum: 1 } } }
    ]);
    res.json({ message: "Analyse effectuée", resultats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Générer des statistiques (et les sauvegarder)
exports.genererStatistique = async (req, res) => {
  try {
    const resultats = await Incident.aggregate([
      { $group: { _id: "$statut", total: { $sum: 1 } } }
    ]);

    const stats = await Promise.all(
      resultats.map(async (r) => {
        const stat = new Statistique({
          type: r._id,
          valeur: r.total.toString()
        });
        return await stat.save();
      })
    );

    res.json({ message: "Statistiques générées", stats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
