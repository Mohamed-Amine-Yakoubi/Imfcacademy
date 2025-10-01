const express = require("express");
const route = express.Router();
const ReservationController = require("../Controllers/ReservationTableController");

route.post("/Create_Reservation",ReservationController.Create_Reservation);
route.get("/Get_AllReservation",ReservationController.Get_AllReservations);
route.get("/Get_spec_Reservation/:id_Reservation",ReservationController.Get_spec_Reservation);
route.delete("/Delete_spec_Reservation/:id_Reservation",ReservationController.Delete_spec_Reservation);
route.put("/Update_spec_Reservation/:id_Reservation",ReservationController.Update_spec_Reservation);
 

module.exports = route;