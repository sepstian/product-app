const router = require("express").Router();
const { produkController } = require("../controller");

router.get("/", produkController.getProduk);
router.post("/create", produkController.createProduk);
router.patch("/edit", produkController.editProduk);
router.delete("/delete", produkController.deleteProduk);

module.exports = router;
