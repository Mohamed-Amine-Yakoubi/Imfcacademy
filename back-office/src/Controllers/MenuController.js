const MenuModel = require("../Models/MenuModel.js");

const asyncHandler = require("express-async-handler");

//Create Menu/
exports.Create_Menu = asyncHandler(async (req, res) => {
  try {
    const {
      Libelle_Menu,
      Description_Menu,
      Prix_Menu,
      Type_Menu,
      Specialite,
    } = req.body;
    const photoPath = req.file ? req.file.publicPath : null;
    const Menu = await MenuModel.create({
      Libelle_Menu,
      Description_Menu,
      Prix_Menu,
      photo_Menu: photoPath,

      Type_Menu,
      Specialite,
    });

    if (Menu) {
      res.status(201).json({
        message: "Menu has been added successfully",
        data: Menu,
      });
    } else {
      res.status(404).json({
        message: "Menu has not been added",
      });
    }
  } catch (error) {
    console.log("error while adding Menu", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
/**************Get all Menu************* */
exports.Get_AllMenu = asyncHandler(async (req, res) => {
  try {
    const get_allMenu = await MenuModel.findAll({});
    if (get_allMenu) {
      res.status(201).json(get_allMenu);
    } else {
      res.status(404).json({ message: "your Menu have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
// /**************Get specific Menu************* */
exports.Get_spec_Menu = asyncHandler(async (req, res) => {
  try {
    const { id_Menu } = req.params;
    const get_spec_Menu = await MenuModel.findByPk(id_Menu);
    if (get_spec_Menu) {
      res.status(201).json(get_spec_Menu);
    } else {
      res.status(404).json({ message: "your Menu have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// /**************Get specific Menu************* */
exports.Get_Type_Menu = asyncHandler(async (req, res) => {
  try {
    const { Type_Menu } = req.params;

    // Find all menus with the given Type_Menu
    const get_Type_Menu = await MenuModel.findAll({ where: { Type_Menu } });

    if (get_Type_Menu.length > 0) {
      res.status(200).json(get_Type_Menu);
    } else {
      res.status(404).json({ message: "No menus found with this type" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


/**************Delete specific Menu************* */
exports.Delete_spec_Menu = asyncHandler(async (req, res) => {
  try {
    const { id_Menu } = req.params;

    const delete_spec_Menu = await MenuModel.destroy({
      where: {
        id_Menu: id_Menu,
      },
    });
    if (delete_spec_Menu) {
      res.status(201).json({
        message: "your Menu have been successfully deleted",
        data: delete_spec_Menu,
      });
    } else {
      res.status(400).json({ message: "your Menu have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
// /**************Update specific Menu************* */
exports.Update_spec_Menu = asyncHandler(async (req, res) => {
  try {
    const { id_Menu } = req.params;
    const {
      Libelle_Menu,
      Description_Menu,
      Prix_Menu,
      Type_Menu,
      Specialite,
    } = req.body;

    // Si un fichier a été envoyé, récupérer son chemin, sinon garder l'ancien
    const photoPath = req.file ? req.file.publicPath : null;

    // 1. Récupérer le menu existant
    const existingMenu = await MenuModel.findByPk(id_Menu);
    if (!existingMenu) {
      return res.status(404).json({ message: `Menu introuvable` });
    }

    // 2. Créer l’objet avec les champs mis à jour
    const updateFields = {
      Libelle_Menu,
      Description_Menu,
      Prix_Menu,
      photo_Menu: photoPath || existingMenu.photo_Menu, // garder l'ancien si aucun nouveau
      Type_Menu,
      Specialite,
    };

    console.log("photo_Menu reçu :", updateFields.photo_Menu);

    // 3. Mettre à jour dans la base de données
    await MenuModel.update(updateFields, {
      where: { id_Menu },
    });

    res.status(200).json({
      message: "Votre menu a été modifié avec succès",
      data: updateFields,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});