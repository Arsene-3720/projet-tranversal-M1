// server.js
require('dotenv').config();

const express = require('express');
const cors = require('cors');

// ⚠️ Adapte le chemin si besoin (ex: './src/data-source' ou './data-source')
const dataSource = require('./data-source/data-source');
const routes = require('./routes/routes'); // tes routes Express

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Petite route santé
app.get('/health', (req, res) => res.json({ status: 'ok' }));

async function start() {
  try {
    // Connexion à PostgreSQL via TypeORM
    const ds = await dataSource.initialize();
    console.log('🚀 Connecté à PostgreSQL via TypeORM !');

    // (Optionnel) appliquer automatiquement les migrations à chaque démarrage
    // await ds.runMigrations();

    // Rendre la DataSource accessible aux routes
    app.locals.ds = ds;

    // Si tu veux l'injecter dans req :
    app.use((req, _res, next) => { req.ds = ds; next(); });

    // Routes API
    app.use('/api', routes);

    // Route test
    app.get('/', (_req, res) => res.send('Serveur fonctionnel !'));

    // Lancer le serveur
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Serveur lancé sur le port ${PORT}`);
    });

    // Fermeture propre
    process.on('SIGINT', async () => {
      console.log('\n⏹️ Arrêt…');
      try { await ds.destroy(); } catch (e) {}
      process.exit(0);
    });
  } catch (err) {
    console.error('❌ Erreur TypeORM/PostgreSQL :', err);
    process.exit(1);
  }
}

start();
