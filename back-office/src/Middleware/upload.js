const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
    file.publicPath = `/uploads/${uniqueName}`; // <- champ personnalisé
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

module.exports = upload;
