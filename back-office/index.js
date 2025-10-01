require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
const sequelize = require("./src/config/Database.js");
const Formation = require("./src/Models/FormationsModel.js");
const Evenement = require("./src/Models/EvenementsModel.js");
const Inscription = require("./src/Models/InscriptionsModel.js");
const ReservationEvent = require("./src/Models/ReservationsEventModel.js");
const ReservationTable = require("./src/Models/ReservationTableModel.js");
const ContactModel = require("./src/Models/ContactModel.js");
const User = require("./src/Models/UserModel.js");
const Menu = require("./src/Models/MenuModel.js");
const Contact = require("./src/Models/ContactModel.js");

const FormationsRouter = require("./src/Routers/FormationsRouter.js");
const EvenementsRouter = require("./src/Routers/EvenementsRouter.js");
const InscriptionsRouter = require("./src/Routers/InscriptionsRouter.js");
const ReservationTableRouter = require("./src/Routers/ReservationTableRouter.js");
const ReservationsEventRouter = require("./src/Routers/ReservationsEventRouter.js");
const ContactRouter = require("./src/Routers/ContactRouter.js");
const UserRouter = require("./src/Routers/UserRouter.js");
const MenuRouter = require("./src/Routers/MenuRouter.js");
 

app.use("/api/Formations", FormationsRouter);
app.use("/api/Evenements", EvenementsRouter);
app.use("/api/Inscriptions", InscriptionsRouter);
app.use("/api/ReservationsTable", ReservationTableRouter);
app.use("/api/ReservationsEvent", ReservationsEventRouter);
app.use("/api/Contact", ContactRouter);
app.use("/api/User", UserRouter);
app.use("/api/Menu", MenuRouter);
 

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connexion à la base de données réussie.");

    await sequelize.sync(); 
    console.log("✅ Synchronisation des modèles terminée.");
 
  } catch (error) {
    console.error("❌ Erreur de connexion :", error);
  }
})();
