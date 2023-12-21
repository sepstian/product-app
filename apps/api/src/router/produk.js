const router = require("express").Router();
const { produkController } = require("../controller");
const { validateProduk } = require("../middleware/validation");

router.get("/", produkController.getProduk);
router.get("/sort-status/:id", produkController.getStatusProduk);
router.get("/getkeep", validateProduk, produkController.getProduk);
router.post("/create", produkController.createProduk);
router.patch("/edit/:id", produkController.editProduk);
router.delete("/delete/:id", produkController.deleteProduk);

module.exports = router;
