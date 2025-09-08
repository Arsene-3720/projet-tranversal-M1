const mongoose = require("mongoose");

const citoyenSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true }
});

// Méthodes possibles
citoyenSchema.methods.peutSignaler = function () {
  console.log("Le citoyen peut signaler un incident.");
};

citoyenSchema.methods.consulterCarte = function () {
  console.log("Le citoyen consulte la carte des zones.");
};

module.exports = mongoose.model("Citoyen", citoyenSchema);
