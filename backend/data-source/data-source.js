// src/data-source.js (ou backend/data-source/data-source.js)
const { DataSource } = require('typeorm');
require('dotenv').config();

const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,          // External URL Render (avec ?sslmode=require)
  ssl: { rejectUnauthorized: false },
  synchronize: false,
  logging: true,
  entities: [
    require('../entities/user.entity').UserSchema,
    require('../entities/alerte.entity').AlerteSchema,
    require('../entities/cartezones.entity').CarteZonesSchema,
    require('../entities/typeIncident.entity').TypeIncidentSchema,
  ],
  migrations: [
    // ex: require('../migrations/js/1719830000000-CreateUser'),
  ],
});

module.exports = dataSource;
