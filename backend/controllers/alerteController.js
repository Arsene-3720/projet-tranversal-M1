// controllers/alerte.controller.js (TypeORM)
const { Alerte } = require('../entities/alerte.entity');

// Créer une alerte
exports.createAlert = async (req, res) => {
  try {
    const repo = req.ds.getRepository(Alerte);
    const { type, data, maisonId, sendToOperator } = req.body;

    const alerte = repo.create({
      type,
      data,                    // JSON ou texte selon ton entity
      maisonId,               // garde le même nom que dans l'entité
      sendToOperator: !!sendToOperator,
      sentToPolice: false,    // par défaut
    });

    await repo.save(alerte);
    res.status(201).json({ message: 'Alerte sauvegardée', alerte });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Marquer "envoyée à la police"
exports.sendToPolice = async (req, res) => {
  try {
    const repo = req.ds.getRepository(Alerte);
    const id = req.params.id; // string OK pour BIGINT

    const alerte = await repo.findOne({ where: { id } });
    if (!alerte) return res.status(404).json({ error: 'Alerte introuvable' });

    alerte.sentToPolice = true;
    await repo.save(alerte);

    res.json({ message: 'Alerte envoyée à la police', alerte });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
