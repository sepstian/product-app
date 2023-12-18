const router = require("express").Router()
const { statusController } = require("../controller")

router.get("/", statusController.getStatus)
router.post("/create", statusController.createStatus)

module.exports = router