const UserModel = require("../Models/UserModel.js");

const asyncHandler = require("express-async-handler");

//SignIn
exports.SingIn = asyncHandler(async (req, res) => {
  try {
    const { Email_user, MotDePasse_user } = req.body;
    if (!Email_user && !MotDePasse_user) {
      return res.status(400).json({ message: "Missing required fields" });
    } else if (Email_user && MotDePasse_user) {
      const user = await UserModel.findOne({
        where: { Email_user: Email_user },
      });

      if (
        !user || MotDePasse_user!= user.MotDePasse_user
      ) {
        return res.status(400).json({ message: "Incorrect email or password" });
      }
      return res.status(200).json({ message: "user found successfully", user });
    } else {
      res.status(404).json({ message: " account have not been found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
