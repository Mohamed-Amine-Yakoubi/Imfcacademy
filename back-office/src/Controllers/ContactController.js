const ContactModel = require("../Models/ContactModel.js");

const asyncHandler = require("express-async-handler");

//Create Contacts/
exports.Create_Contact = asyncHandler(async (req, res) => {
  try {
    const {
      Nom_Prenom_Contact,
      NumTel_Contact,
      Email_Contact,
      Sujet_Contact,
      Message_Contact,
    } = req.body;

    const Contacts = await ContactModel.create({
      Nom_Prenom_Contact,
      NumTel_Contact,
      Email_Contact,
      Sujet_Contact,
      Message_Contact,
    });

    if (Contacts) {
      res.status(201).json({
        message: "Contact has been added successfully",
        data: Contacts,
      });
    } else {
      res.status(404).json({
        message: "Contact has not been added",
      });
    }
  } catch (error) {
    console.log("error while adding Contact", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
/**************Get all Contacts************* */
exports.Get_AllContacts = asyncHandler(async (req, res) => {
  try {
    const get_allContacts = await ContactModel.findAll({});
    if (get_allContacts) {
      res.status(201).json(get_allContacts);
    } else {
      res
        .status(404)
        .json({ message: "your Contacts have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
// /**************Get specific Contact************* */
exports.Get_spec_Contact = asyncHandler(async (req, res) => {
  try {
    const { id_Contact } = req.params;
    const get_spec_Contact =
      await ContactModel.findByPk(id_Contact);
    if (get_spec_Contact) {
      res.status(201).json(get_spec_Contact);
    } else {
      res.status(404).json({ message: "your Contact have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

/**************Delete specific Contact************* */
exports.Delete_spec_Contact = asyncHandler(async (req, res) => {
  try {
    const { id_Contact } = req.params;

    const delete_spec_Contact = await ContactModel.destroy({
      where: {
        id_Contact: id_Contact,
      },
    });
    if (delete_spec_Contact) {
      res.status(201).json({
        message: "your Contact have been successfully deleted",
        data: delete_spec_Contact,
      });
    } else {
      res.status(400).json({ message: "your Contact have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
// /**************Update specific Contact************* */
exports.Update_spec_Contact = asyncHandler(async (req, res) => {
  try {
    const { id_Contact } = req.params;

    const {
      Nom_Prenom_Contact,
      NumTel_Contact,
      Email_Contact,
      Sujet_Contact,
      Message_Contact,
      Etat_Contact
    } = req.body;

    const updateFields = {
      Nom_Prenom_Contact,
      NumTel_Contact,
      Email_Contact,
      Sujet_Contact,
      Message_Contact,
      Etat_Contact
    };

    const updateContact = await ContactModel.update(updateFields, {
      where: { id_Contact: id_Contact },
      new: true,
    });

    if (updateContact) {
      res.status(201).json({
        message: "Your Contact has been successfully updated",
        data: updateContact,
      });
    } else {
      res
        .status(404)
        .json({ message: `Contact with ID ${id_Contact} not found` });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
