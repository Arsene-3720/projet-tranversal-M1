const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema({
  type: { type: String, required: true },
  localisation: { type: String, required: true },
  date: { type: Date, default: Date.now },
  statut: { type: String, default: "En cours" }
});

module.exports = mongoose.model("Incident", incidentSchema);
