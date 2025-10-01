const express = require("express");
const route = express.Router();
const EvenementsController = require("../Controllers/EvenementsController.js");
const upload = require("../Middleware/upload.js");
route.post("/Create_Evenement",upload.array("photo_Evenement", 10), EvenementsController.Create_Evenement);
route.get("/Get_AllEvenements",EvenementsController.Get_AllEvenements);
route.get("/Get_spec_Evenement/:id_Evenement",EvenementsController.Get_spec_Evenement);
route.delete("/Delete_spec_Evenement/:id_Evenement",EvenementsController.Delete_spec_Evenement);
route.put("/Update_spec_Evenement/:id_Evenement",upload.array("photo_Evenement", 10),EvenementsController.Update_spec_Evenement);


module.exports = route;