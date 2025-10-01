const ReservationModel = require("../Models/ReservationsEventModel.js");

const asyncHandler = require("express-async-handler");

//Create Reservations/
exports.Create_Reservation = asyncHandler(async (req, res) => {
  try {
    const {
      Nom_Prenom_Reservation,

      NumTel_Reservation,
      Nbr_personnes,
      Etat_Reservation,
      id_Evenement,
    } = req.body;

    const Reservations = await ReservationModel.create({
      Nom_Prenom_Reservation,

      NumTel_Reservation,
      Nbr_personnes,
      Etat_Reservation,
      id_Evenement,
    });

    if (Reservations) {
      res.status(201).json({
        message: "Reservation has been added successfully",
        data: Reservations,
      });
    } else {
      res.status(404).json({
        message: "Reservation has not been added",
      });
    }
  } catch (error) {
    console.log("error while adding Reservation", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
/**************Get all Reservations************* */
exports.Get_AllReservations = asyncHandler(async (req, res) => {
  try {
    const get_allReservations = await ReservationModel.findAll({});
    if (get_allReservations) {
      res.status(201).json(get_allReservations);
    } else {
      res
        .status(404)
        .json({ message: "your Reservations have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
// /**************Get specific Reservation************* */
exports.Get_spec_Reservation = asyncHandler(async (req, res) => {
  try {
    const { id_Evenement } = req.params;
    const get_spec_Reservation =
      await ReservationModel.findAll(id_Evenement);
    if (get_spec_Reservation) {
      res.status(201).json(get_spec_Reservation);
    } else {
      res.status(404).json({ message: "your Reservation have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
/**************Delete specific Reservation************* */
exports.Delete_spec_Reservation = asyncHandler(async (req, res) => {
  try {
    const { id_Reservation } = req.params;

    const delete_spec_Reservation = await ReservationModel.destroy({
      where: {
        id_Reservation: id_Reservation,
      },
    });
    if (delete_spec_Reservation) {
      res.status(201).json({
        message: "your Reservation have been successfully deleted",
        data: delete_spec_Reservation,
      });
    } else {
      res.status(400).json({ message: "your Reservation have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
// /**************Get specific reservation event************* */
exports.Get_Allreservation_event = asyncHandler(async (req, res) => {
  try {
    const { id_Evenement } = req.params;
    const get_spec_reservation = await ReservationModel.findAll({where:{id_Evenement:id_Evenement}});
    if (get_spec_reservation) {
      res.status(201).json(get_spec_reservation);
    } else {
      res.status(404).json({ message: "your reservation have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
// /**************Update specific Reservation************* */
exports.Update_spec_Reservation = asyncHandler(async (req, res) => {
  try {
    const { id_Reservation } = req.params;

    const {
      Nom_Prenom_Reservation,

      NumTel_Reservation,
      Nbr_personnes,
      Etat_Reservation,
      id_Evenement,
    } = req.body;

    const updateFields = {
      Nom_Prenom_Reservation,

      NumTel_Reservation,
      Nbr_personnes,
      Etat_Reservation,
      id_Evenement,
    };

    const updateReservation = await ReservationModel.update(updateFields, {
      where: { id_Reservation: id_Reservation },
      new: true,
    });

    if (updateReservation) {
      res.status(201).json({
        message: "Your Reservation has been successfully updated",
        data: updateReservation,
      });
    } else {
      res
        .status(404)
        .json({ message: `Reservation with ID ${id_Reservation} not found` });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
