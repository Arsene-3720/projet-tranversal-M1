const express = require("express");
const router = express.Router();

const citoyenController = require("../controllers/citoyenController");
const incidentController = require("../controllers/incidentController");
const operateurController = require("../controllers/operateurController");
const statistiqueController = require("../controllers/statistiqueController");
const typeIncidentController = require("../controllers/typeIncidentController");
const uniteController = require("../controllers/uniteTerrainController");
const adminController = require("../controllers/administrateurController");
const alerteController = require("../controllers/alerteController");
const analysteController = require("../controllers/analysteController");
const carteZonesController = require("../controllers/carteZonesController");
const authController = require("../controllers/authController");

const authMiddleware = require("../middlewares/authMiddleware"); 

// Routes  register et login
// Admin
router.post("/admins/register", authController.registerAdmin);
router.post("/admins/login", authController.loginAdmin);
router.post("/operateurs/register", authController.registerOperateur);
router.post("/operateurs/login", authController.loginOperateur);
router.post("/citoyens/register", authController.registerCitoyen);
router.post("/citoyens/login", authController.loginCitoyen);
router.post("/analystes/register", authController.registerAnalyste);
router.post("/analystes/login", authController.loginAnalyste);


// ------------------- CITOYENS -------------------
// lecture publique
router.get("/citoyens", citoyenController.getCitoyens);
router.get("/citoyens/:id", citoyenController.getCitoyenById);
// modification protégée (admin seulement)
router.put("/citoyens/:id", authMiddleware, citoyenController.updateCitoyen);
router.delete("/citoyens/:id", authMiddleware, citoyenController.deleteCitoyen);

// ------------------- INCIDENTS -------------------
router.get("/incidents", incidentController.getIncidents);
router.get("/incidents/:id", incidentController.getIncidentById);
router.post("/incidents", authMiddleware, incidentController.createIncident);
router.put("/incidents/:id", authMiddleware, incidentController.updateIncident);
router.delete("/incidents/:id", authMiddleware, incidentController.deleteIncident);

// ------------------- OPERATEURS -------------------
router.get("/operateurs", authMiddleware, operateurController.getOperateurs);
router.get("/operateurs/:id", authMiddleware, operateurController.getOperateurById);
router.put("/operateurs/:id", authMiddleware, operateurController.updateOperateur);
router.delete("/operateurs/:id", authMiddleware, operateurController.deleteOperateur);

// ------------------- STATISTIQUES -------------------
router.get("/statistiques", authMiddleware, statistiqueController.getStatistiques);
router.get("/statistiques/:id", authMiddleware, statistiqueController.getStatistiqueById);
router.post("/statistiques", authMiddleware, statistiqueController.createStatistique);
router.put("/statistiques/:id", authMiddleware, statistiqueController.updateStatistique);
router.delete("/statistiques/:id", authMiddleware, statistiqueController.deleteStatistique);

// ------------------- TYPES D'INCIDENT -------------------
router.get("/types-incident", typeIncidentController.getTypeIncidents);
router.get("/types-incident/:id", typeIncidentController.getTypeIncidentById);
router.post("/types-incident", authMiddleware, typeIncidentController.createTypeIncident);
router.put("/types-incident/:id", authMiddleware, typeIncidentController.updateTypeIncident);
router.delete("/types-incident/:id", authMiddleware, typeIncidentController.deleteTypeIncident);

// ------------------- UNITES -------------------
router.get("/unites", uniteController.getUnites);
router.get("/unites/:id", uniteController.getUniteById);
router.post("/unites", authMiddleware, uniteController.createUnite);
router.put("/unites/:id", authMiddleware, uniteController.updateUnite);
router.delete("/unites/:id", authMiddleware, uniteController.deleteUnite);

// ------------------- ADMINISTRATEURS -------------------
router.get("/admins", authMiddleware, adminController.getAdmins);
router.get("/admins/:id", authMiddleware, adminController.getAdminById);
router.put("/admins/:id", authMiddleware, adminController.updateAdmin);
router.delete("/admins/:id", authMiddleware, adminController.deleteAdmin);

// ------------------- ALERTES -------------------
router.get("/alertes", authMiddleware, alerteController.getAlertes);
router.get("/alertes/:id", authMiddleware, alerteController.getAlerteById);
router.post("/alertes", authMiddleware, alerteController.createAlerte);
router.put("/alertes/:id", authMiddleware, alerteController.updateAlerte);
router.delete("/alertes/:id", authMiddleware, alerteController.deleteAlerte);

// ------------------- ANALYSTES -------------------
router.get("/analystes", authMiddleware, analysteController.getAnalystes);
router.get("/analystes/:id", authMiddleware, analysteController.getAnalysteById);
router.put("/analystes/:id", authMiddleware, analysteController.updateAnalyste);
router.delete("/analystes/:id", authMiddleware, analysteController.deleteAnalyste);

// ------------------- CARTE DES ZONES -------------------
router.get("/zones", carteZonesController.getZones);
router.get("/zones/:id", carteZonesController.getZoneById);
router.post("/zones", authMiddleware, carteZonesController.createZone);
router.put("/zones/:id", authMiddleware, carteZonesController.updateZone);
router.delete("/zones/:id", authMiddleware, carteZonesController.deleteZone);

// ------------------- MÉTHODES UML -------------------
// Citoyens
router.get("/citoyens/:id/peut-signaler", authMiddleware, citoyenController.peutSignaler);
router.get("/citoyens/:id/consulter-carte", authMiddleware, citoyenController.consulterCarte);

// Opérateurs
router.post("/operateurs/:id/qualifier-incident", authMiddleware, operateurController.qualifierIncident);
router.post("/operateurs/:id/assigner-unite", authMiddleware, operateurController.assignerUnite);

// Unités
router.put("/unites/:id/intervention/:incidentId", authMiddleware, uniteController.effectuerIntervention);
router.put("/unites/:id/cloturer", authMiddleware, uniteController.cloturerIncident);

// Administrateurs
router.get("/admins/:id/utilisateurs", authMiddleware, adminController.gererUtilisateurs);
router.get("/admins/:id/types-incident", authMiddleware, adminController.gererTypesIncident);

// Analystes
router.get("/analystes/:id/analyser", authMiddleware, analysteController.analyserDonnees);
router.post("/analystes/:id/statistiques", authMiddleware, analysteController.genererStatistique);

module.exports = router;
