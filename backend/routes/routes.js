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
router.post("/register", authController);
router.post("/login", authController);



// ------------------- CITOYENS -------------------
// lecture publique
router.get("/citoyens", citoyenController.getCitoyens);
router.get("/citoyens/:id", citoyenController.getCitoyenById);
// modification protégée (admin seulement)
router.put("/citoyens/:id", authMiddleware, citoyenController.updateCitoyen);
router.delete("/citoyens/:id", authMiddleware, citoyenController.deleteCitoyen);

// ------------------- INCIDENTS -------------------

// ------------------- OPERATEURS -------------------

// ------------------- STATISTIQUES -------------------

// ------------------- TYPES D'INCIDENT -------------------


// ------------------- UNITES -------------------


// ------------------- ADMINISTRATEURS -------------------


// ------------------- ALERTES -------------------
router.post("/alerts", alerteController.createAlert);
router.put("/alerts/:id/send-to-police", alerteController.sendToPolice);

// ------------------- ANALYSTES -------------------


// ------------------- CARTE DES ZONES -------------------

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


module.exports = router;
