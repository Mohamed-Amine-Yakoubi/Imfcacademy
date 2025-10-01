const express = require("express");
const route = express.Router();
const ReservationsEventController = require("../Controllers/ReservationsEventController.js");

route.post("/Create_Reservation",ReservationsEventController.Create_Reservation);
route.get("/Get_AllReservations",ReservationsEventController.Get_AllReservations);
route.get("/Get_spec_Reservation/:id_Reservation",ReservationsEventController.Get_spec_Reservation);
route.delete("/Delete_spec_Reservation/:id_Reservation",ReservationsEventController.Delete_spec_Reservation);
route.put("/Update_spec_Reservation/:id_Reservation",ReservationsEventController.Update_spec_Reservation);


module.exports = route;