const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
require("dotenv").config();


const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connecté ✅"))
  .catch(err => console.error(err));

  app.use('/safe', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Serveur lancé sur le port ${PORT}`));



app.listen(PORT, () => console.log(`connecté sur le port ${PORT}`));
