const router = require("express").Router()
const { produkController } = require("../controller")

router.post("/create", produkController.createProduk)
router.get("/", produkController.getProduk)
router.patch("/edit", produkController.editProduk)
router.delete("/delete", produkController.deleteProduk)

module.exports = router