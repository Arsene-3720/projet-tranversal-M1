const mongoose = require("mongoose");

const carteZonesSchema = new mongoose.Schema({
  zone: { type: String, required: true },
  niveauRisque: { type: String, required: true }
});

module.exports = mongoose.model("CarteZones", carteZonesSchema);
