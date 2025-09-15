const Alert = require("../models/Alerte");

exports.createAlert = async (req, res) => {
  try {
    const { type, data, maisonId, sendToOperator } = req.body;
    const alert = new Alert({ type, data, maisonId, sendToOperator });
    await alert.save();
    res.status(201).json({ message: "Alerte sauvegardée", alert });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.sendToPolice = async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(
      req.params.id,
      { sentToPolice: true },
      { new: true }
    );
    if (!alert) return res.status(404).json({ error: "Alerte introuvable" });
    res.json({ message: "Alerte envoyée à la police", alert });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
