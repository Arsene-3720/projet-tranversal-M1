const mongoose = require("mongoose");

const administrateurSchema = new mongoose.Schema({
  nom: { type: String, required: true }
});

administrateurSchema.methods.gererUtilisateurs = function () {
  console.log("Gestion des utilisateurs.");
};

administrateurSchema.methods.gererTypesIncident = function () {
  console.log("Gestion des types d’incidents.");
};

module.exports = mongoose.model("Administrateur", administrateurSchema);
