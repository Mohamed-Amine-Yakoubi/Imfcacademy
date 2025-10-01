const express = require("express");
const route = express.Router();
const MenuController = require("../Controllers/MenuController.js");
const upload = require("../Middleware/upload.js");
route.post("/Create_Menu",upload.single("photo_Menu"), MenuController.Create_Menu);
route.get("/Get_AllMenu",MenuController.Get_AllMenu);
route.get("/Get_spec_Menu/:id_Menu",MenuController.Get_spec_Menu);
route.get("/Get_Type_Menu/:Type_Menu",MenuController.Get_Type_Menu);
route.delete("/Delete_spec_Menu/:id_Menu",MenuController.Delete_spec_Menu);
route.put("/Update_spec_Menu/:id_Menu",upload.single("photo_Menu"),MenuController.Update_spec_Menu);


module.exports = route;