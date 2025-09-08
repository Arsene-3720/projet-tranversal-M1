const mongoose = require("mongoose");

const alerteSchema = new mongoose.Schema({
  message: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Alerte", alerteSchema);
