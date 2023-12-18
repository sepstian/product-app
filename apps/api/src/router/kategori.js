const router = require("express").Router();
const { kategoriController } = require("../controller");

router.get("/", kategoriController.getKategori);
router.post("/create", kategoriController.createKategori);

module.exports = router;
