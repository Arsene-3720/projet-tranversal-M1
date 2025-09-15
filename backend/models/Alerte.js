// models/Alert.js
const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  type: { type: String, enum: ["image", "video", "stat"], required: true },
  data: { type: String, required: true }, // URL ou base64
  maisonId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // ou Maison
  sendToOperator: { type: Boolean, default: false },
  sentToPolice: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Alert", alertSchema);

