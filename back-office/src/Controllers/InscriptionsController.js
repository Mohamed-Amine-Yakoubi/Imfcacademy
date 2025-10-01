const InscriptionModel = require("../Models/InscriptionsModel.js");

const asyncHandler = require("express-async-handler");

//Create Inscriptions/
exports.Create_Inscription = asyncHandler(async (req, res) => {
  try {
    const {
      Nom_Prenom_inscrit,
      Email_inscrit,
      NumTel_Inscrit,
      NumCin_Inscrit,
      Adresse_Inscrit,
      id_formation 
    } = req.body;

    const Inscriptions = await InscriptionModel.create({
      Nom_Prenom_inscrit,
      Email_inscrit,
      NumTel_Inscrit,
      NumCin_Inscrit,
      Adresse_Inscrit,
      id_formation ,
      
    });

    if (Inscriptions) {
      res.status(201).json({
        message: "Inscription has been added successfully",
        data: Inscriptions,
      });
    } else {
      res.status(404).json({
        message: "Inscription has not been added",
      });
    }
  } catch (error) {
    console.log("error while adding Inscription", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
/**************Get all Inscriptions************* */
exports.Get_AllInscriptions = asyncHandler(async (req, res) => {
  try {
    const get_allInscriptions = await InscriptionModel.findAll({});
    if (get_allInscriptions) {
      res.status(201).json(get_allInscriptions);
    } else {
      res
        .status(404)
        .json({ message: "your Inscriptions have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
// /**************Get specific Inscription************* */
exports.Get_spec_Inscription = asyncHandler(async (req, res) => {
  try {
    const { id_Inscrit } = req.params;
    const get_spec_Inscription = await InscriptionModel.findByPk(id_Inscrit);
    if (get_spec_Inscription) {
      res.status(201).json(get_spec_Inscription);
    } else {
      res.status(404).json({ message: "your Inscription have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
// /**************Get specific Inscription************* */
exports.Get_Inscription_Formation = asyncHandler(async (req, res) => {
  try {
    const { id_formation } = req.params;
    const inscription_formation = await InscriptionModel.findAll({where:{id_formation:id_formation}});
    if (inscription_formation) {
      res.status(201).json(inscription_formation);
    } else {
      res.status(404).json({ message: "your Inscription have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
/**************Delete specific Inscription************* */
exports.Delete_spec_Inscription = asyncHandler(async (req, res) => {
  try {
    const { id_Inscrit } = req.params;

    const delete_spec_Inscription = await InscriptionModel.destroy({
      where: {
        id_Inscrit: id_Inscrit,
      },
    });
    if (delete_spec_Inscription) {
      res.status(201).json({
        message: "your Inscription have been successfully deleted",
        data: delete_spec_Inscription,
      });
    } else {
      res.status(400).json({ message: "your Inscription have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
// /**************Update specific Inscription************* */
exports.Update_spec_Inscription = asyncHandler(async (req, res) => {
  try {
    const { id_Inscrit } = req.params;

    const {
      Nom_Prenom_inscrit,
      Email_inscrit,
      NumTel_Inscrit,
      NumCin_Inscrit,
      Adresse_Inscrit,
      Montant_payer,
      Etat_Inscrit,
      id_formation,
    } = req.body;

    const updateFields = {
      Nom_Prenom_inscrit,
      Email_inscrit  ,
      NumTel_Inscrit ,
      NumCin_Inscrit ,
      Adresse_Inscrit,
      Montant_payer  ,
      Etat_Inscrit   ,
      id_formation   ,
    };

    const updateInscription = await InscriptionModel.update(updateFields, {
      where: { id_Inscrit: id_Inscrit },
      new: true,
    });

    if (updateInscription) {
      res.status(201).json({
        message: "Your Inscription has been successfully updated",
        data: updateInscription,
      });
    } else {
      res
        .status(404)
        .json({ message: `Inscription with ID ${id_Inscrit} not found` });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
