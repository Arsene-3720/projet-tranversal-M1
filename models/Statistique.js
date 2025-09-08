const mongoose = require("mongoose");

const statistiqueSchema = new mongoose.Schema({
  type: { type: String, required: true },
  valeur: { type: String, required: true }
});

module.exports = mongoose.model("Statistique", statistiqueSchema);
