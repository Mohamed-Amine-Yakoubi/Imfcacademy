const FormationModel = require("../Models/FormationsModel.js");

const asyncHandler = require("express-async-handler");

//Create Formations/
exports.Create_Formation = asyncHandler(async (req, res) => {
  try {
    const {
      libelle_formation,
      modules_enseignes,
     prix_formation,
      type_formation,
      Date_Debut,
      Date_Fin,
    } = req.body;
const photoPaths = req.files.map(file => file.publicPath);

    const Formations = await FormationModel.create({
      libelle_formation,
      modules_enseignes,
      prix_formation,
           photo_formation:photoPaths,
      type_formation,
           Date_Debut,
      Date_Fin,
    });

    if (Formations) {
      res.status(201).json({
        message: "Formation has been added successfully",
        data: Formations,
      });
    } else {
      res.status(404).json({
        message: "Formation has not been added",
      });
    }
  } catch (error) {
    console.log("error while adding Formation", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
/**************Get all Formations************* */
exports.Get_AllFormations = asyncHandler(async (req, res) => {
  try {
    const get_allFormations = await FormationModel.findAll({});
    if (get_allFormations) {
      res.status(201).json(get_allFormations);
    } else {
      res.status(404).json({ message: "your Formations have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
// /**************Get specific Formation************* */
exports.Get_spec_Formation = asyncHandler(async (req, res) => {
  try {
    const { id_formation } = req.params;
    const get_spec_Formation = await FormationModel.findByPk(id_formation);
    if (get_spec_Formation) {
      res.status(201).json(get_spec_Formation);
    } else {
      res.status(404).json({ message: "your Formation have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
/**************Delete specific Formation************* */
exports.Delete_spec_Formation = asyncHandler(async (req, res) => {
  try {
    const { id_formation } = req.params;

    const delete_spec_Formation = await FormationModel.destroy({
      where: {
        id_formation: id_formation,
      },
    });
    if (delete_spec_Formation) {
      res.status(201).json({
        message: "your Formation have been successfully deleted",
        data: delete_spec_Formation,
      });
    } else {
      res.status(400).json({ message: "your Formation have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
// /**************Update specific Formation************* */
exports.Update_spec_Formation = asyncHandler(async (req, res) => {
  try {
    const { id_formation } = req.params;

    const {
      libelle_formation,
      modules_enseignes,
      prix_formation,
      type_formation,
           Date_Debut,
      Date_Fin,
    } = req.body;

    // Récupérer la formation existante
    const formation = await FormationModel.findByPk(id_formation);
    if (!formation) {
      return res.status(404).json({ message: `Formation with ID ${id_formation} not found` });
    }

    // Gestion photos : garder les anciennes si pas de nouvelles uploadées
    const photoPaths = (req.files || []).map(file =>
      file.path.replace(/\\/g, "/").replace(/^src\//, "")
    );
   const photo_formation = photoPaths.length > 0 ? photoPaths : formation.photo_formation;

    const updateFields = {
      libelle_formation,
      modules_enseignes,
      photo_formation,
      type_formation,
           Date_Debut,
           prix_formation,
      Date_Fin,
    };

    const updateFormation = await FormationModel.update(updateFields, {
      where: { id_formation: id_formation },
      new: true,
    });

    if (updateFormation) {
      res.status(201).json({
        message: "Your Formation has been successfully updated",
        data: updateFormation,
      });
    } else {
      res
        .status(404)
        .json({ message: `Formation with ID ${id_formation} not found` });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
