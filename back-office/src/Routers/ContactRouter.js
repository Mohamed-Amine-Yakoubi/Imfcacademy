const express = require("express");
const route = express.Router();
const ContactController = require("../Controllers/ContactController");

route.post("/Create_Contact",ContactController.Create_Contact);
route.get("/Get_AllContact",ContactController.Get_AllContacts);
route.get("/Get_spec_Contact/:id_Contact",ContactController.Get_spec_Contact);
route.delete("/Delete_spec_Contact/:id_Contact",ContactController.Delete_spec_Contact);
route.put("/Update_spec_Contact/:id_Contact",ContactController.Update_spec_Contact);
 

module.exports = route;