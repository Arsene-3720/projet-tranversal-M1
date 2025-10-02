// routes/routes.js (simplifié selon tes contrôleurs présents)
const express = require('express');
const router = express.Router();

const incidentController   = require('../controllers/incidentController');
const alerteController     = require('../controllers/alerteController');
const carteZonesController = require('../controllers/carteZonesController');
const authController       = require('../controllers/authController'); // doit exporter { register, login }
const authMiddleware       = require('../middlewares/authMiddleware');

// ---------- AUTH ----------
router.post('/auth/register', authController.register);
router.post('/auth/login',    authController.login);

// ---------- INCIDENTS ----------
router.post('/incidents',        authMiddleware, incidentController.createIncident);
router.get('/incidents',                          incidentController.getIncidents);
router.get('/incidents/:id',                      incidentController.getIncidentById);
router.put('/incidents/:id',     authMiddleware, incidentController.updateIncident);
router.delete('/incidents/:id',  authMiddleware, incidentController.deleteIncident);

// ---------- ALERTES ----------
router.post('/alerts',                            alerteController.createAlert);
router.put('/alerts/:id/send-to-police', authMiddleware, alerteController.sendToPolice);

// ---------- ZONES ----------
router.post('/zones',            authMiddleware, carteZonesController.createZone);
router.get('/zones',                               carteZonesController.getZones);
router.get('/zones/:id',                           carteZonesController.getZoneById);
router.put('/zones/:id',         authMiddleware, carteZonesController.updateZone);
router.delete('/zones/:id',      authMiddleware, carteZonesController.deleteZone);

module.exports = router;
