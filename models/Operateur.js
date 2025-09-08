const mongoose = require("mongoose");

const operateurSchema = new mongoose.Schema({
  nom: { type: String, required: true }
});

operateurSchema.methods.qualifierIncident = function () {
  console.log("Incident qualifié par l’opérateur.");
};

operateurSchema.methods.assignerUnite = function () {
  console.log("Unité assignée à l’incident.");
};

module.exports = mongoose.model("Operateur", operateurSchema);
