// server.js
require('dotenv').config(); // Charger les variables d'environnement

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/routes'); // <-- ton fichier de routes

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connexion à MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('🚀 Connecté à MongoDB Atlas !'))
.catch(err => console.error('❌ Erreur MongoDB :', err));

// Routes
app.use('/api', routes); // toutes les routes sont préfixées par /api

// Route test
app.get('/', (req, res) => {
  res.send('Serveur fonctionnel !');
});

// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0',() => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});
