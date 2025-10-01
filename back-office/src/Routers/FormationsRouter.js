const express = require("express");
const route = express.Router();
const FormationsController = require("../Controllers/FormationsController.js");
const upload = require("../Middleware/upload.js");

route.post("/Create_Formation",upload.array("photo_formation",10),FormationsController.Create_Formation);
route.get("/Get_AllFormations",FormationsController.Get_AllFormations);
route.get("/Get_spec_Formation/:id_formation",FormationsController.Get_spec_Formation);
route.delete("/Delete_spec_Formation/:id_formation",FormationsController.Delete_spec_Formation);
route.put("/Update_spec_Formation/:id_formation",upload.array("photo_formation",10),FormationsController.Update_spec_Formation);


module.exports = route;