const express = require("express");
const route = express.Router();
const UserController = require("../Controllers/UserController.js");
 
route.post("/SingIn",  UserController.SingIn);
 

module.exports = route;