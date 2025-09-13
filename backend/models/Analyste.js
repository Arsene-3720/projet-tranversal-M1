const analysteSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  role: { type: String, default: "analyste" }
});

module.exports = mongoose.model("Analyste", analysteSchema);
