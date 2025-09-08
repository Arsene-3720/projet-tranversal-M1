const mongoose = require("mongoose");

const analysteSchema = new mongoose.Schema({
  nom: { type: String, required: true }
});

module.exports = mongoose.model("Analyste", analysteSchema);
