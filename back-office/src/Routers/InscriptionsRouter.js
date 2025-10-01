const express = require("express");
const route = express.Router();
const InscriptionsController = require("../Controllers/InscriptionsController.js");

route.post("/Create_Inscription",InscriptionsController.Create_Inscription);
route.get("/Get_AllInscriptions",InscriptionsController.Get_AllInscriptions);
route.get("/Get_spec_Inscription/:id_Inscrit",InscriptionsController.Get_spec_Inscription);
route.delete("/Delete_spec_Inscription/:id_Inscrit",InscriptionsController.Delete_spec_Inscription);
route.put("/Update_spec_Inscription/:id_Inscrit",InscriptionsController.Update_spec_Inscription);
route.get("/Get_Inscription_Formation/:id_formation",InscriptionsController.Get_Inscription_Formation);

module.exports = route;