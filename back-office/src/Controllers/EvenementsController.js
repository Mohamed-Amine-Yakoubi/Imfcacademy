const EvenementModel = require("../Models/EvenementsModel.js");

const asyncHandler = require("express-async-handler");

//Create Evenements/
exports.Create_Evenement = asyncHandler(async (req, res) => {
  try {
    const {
      libelle_Evenement,
      Description_Evenement,
Date_Evenement,
horaire_Evenement
    } = req.body;
const photoPaths = req.files.map(file => file.publicPath);
    const Evenements = await EvenementModel.create({
      libelle_Evenement,
      Description_Evenement,
      photo_Evenement: photoPaths,
Date_Evenement,
horaire_Evenement
    });

    if (Evenements) {
      res.status(201).json({
        message: "Evenement has been added successfully",
        data: Evenements,
      });
    } else {
      res.status(404).json({
        message: "Evenement has not been added",
      });
    }
  } catch (error) {
    console.log("error while adding Evenement", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
/**************Get all Evenements************* */
exports.Get_AllEvenements = asyncHandler(async (req, res) => {
  try {
    const get_allEvenements = await EvenementModel.findAll({});
    if (get_allEvenements) {
      res.status(201).json(get_allEvenements);
    } else {
      res.status(404).json({ message: "your Evenements have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
// /**************Get specific Evenement************* */
exports.Get_spec_Evenement = asyncHandler(async (req, res) => {
  try {
    const { id_Evenement } = req.params;
    const get_spec_Evenement = await EvenementModel.findByPk(id_Evenement);
    if (get_spec_Evenement) {
      res.status(201).json(get_spec_Evenement);
    } else {
      res.status(404).json({ message: "your Evenement have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

/**************Delete specific Evenement************* */
exports.Delete_spec_Evenement = asyncHandler(async (req, res) => {
  try {
    const { id_Evenement } = req.params;

    const delete_spec_Evenement = await EvenementModel.destroy({
      where: {
        id_Evenement: id_Evenement,
      },
    });
    if (delete_spec_Evenement) {
      res.status(201).json({
        message: "your Evenement have been successfully deleted",
        data: delete_spec_Evenement,
      });
    } else {
      res.status(400).json({ message: "your Evenement have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
// /**************Update specific Evenement************* */
exports.Update_spec_Evenement = asyncHandler(async (req, res) => {
  try {
    const { id_Evenement } = req.params;
    const {
        libelle_Evenement,
      Description_Evenement,
  photo_Evenement,
 Date_Evenement,
horaire_Evenement
    } = req.body;

    // 1. Récupérer l'événement existant
    const existingEvenement = await EvenementModel.findByPk(id_Evenement);
    if (!existingEvenement) {
      return res.status(404).json({ message: `Evenement introuvable` });
    }

    // 2. Gérer la photo : garder les anciennes si aucune nouvelle photo n’est envoyée
    let updatedPhotos;
    if (photo_Evenement) {
      try {
        const parsedPhotos = JSON.parse(photo_Evenement);
        updatedPhotos = parsedPhotos.length > 0 ? parsedPhotos : existingEvenement.photo_Evenement;
      } catch (error) {
        updatedPhotos = existingEvenement.photo_Evenement;
      }
    } else {
      updatedPhotos = existingEvenement.photo_Evenement;
    }

    // 3. Créer l’objet avec les champs mis à jour
    const updateFields = {
      libelle_Evenement,
       Description_Evenement,
      photo_Evenement: updatedPhotos,
       Date_Evenement,
horaire_Evenement
 
    };

    // 4. Mettre à jour dans la base de données
    const updateEvenement = await EvenementModel.update(updateFields, {
      where: { id_Evenement },
    });
console.log("photo_Evenement reçu :", photo_Evenement);

    res.status(200).json({
      message: "Votre événement a été modifié avec succès",
      data: updateFields,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});
