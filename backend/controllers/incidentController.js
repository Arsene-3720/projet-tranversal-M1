// controllers/incident.controller.js
const { Incident } = require('../entities/typeIncident.entity');

// Créer un incident
exports.createIncident = async (req, res) => {
  try {
    const repo = req.ds.getRepository(Incident);
    const incident = repo.create(req.body);      // instancie depuis le payload
    await repo.save(incident);                   // insert + retourne l'entité
    res.status(201).json(incident);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Lire tous les incidents
exports.getIncidents = async (_req, res) => {
  try {
    const repo = _req.ds.getRepository(Incident);
    const incidents = await repo.find();
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lire un incident par ID
exports.getIncidentById = async (req, res) => {
  try {
    const repo = req.ds.getRepository(Incident);
    const id = req.params.id; // BIGINT possible → garder en string
    const incident = await repo.findOne({ where: { id } });
    if (!incident) return res.status(404).json({ message: 'Incident non trouvé' });
    res.json(incident);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour un incident
exports.updateIncident = async (req, res) => {
  try {
    const repo = req.ds.getRepository(Incident);
    const id = req.params.id;
    const existing = await repo.findOne({ where: { id } });
    if (!existing) return res.status(404).json({ message: 'Incident non trouvé' });

    repo.merge(existing, req.body);          // applique les changements autorisés
    const saved = await repo.save(existing); // update
    res.json(saved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer un incident
exports.deleteIncident = async (req, res) => {
  try {
    const repo = req.ds.getRepository(Incident);
    const id = req.params.id;
    const result = await repo.delete(id);
    if (result.affected === 0) {
      return res.status(404).json({ message: 'Incident non trouvé' });
    }
    res.json({ message: 'Incident supprimé' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
