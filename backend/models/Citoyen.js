
const mongoose = require("mongoose");

const citoyenSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, default: "citoyen" } // rôle par défaut
});

citoyenSchema.methods.peutSignaler = function () {
  console.log("Le citoyen peut signaler un incident.");
};

citoyenSchema.methods.consulterCarte = function () {
  console.log("Le citoyen consulte la carte des zones.");
};

module.exports = mongoose.model("Citoyen", citoyenSchema);
