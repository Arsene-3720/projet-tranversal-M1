const mongoose = require("mongoose");

const uniteTerrainSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  statut: { type: String, enum: ["disponible", "en intervention", "incident clôturé"], default: "disponible" },
  incidentAssocie: { type: mongoose.Schema.Types.ObjectId, ref: "Incident", default: null }
});

module.exports = mongoose.model("UniteTerrain", uniteTerrainSchema);
