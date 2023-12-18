const router = require('express').Router()
const { accountController } = require("../controller")

router.post("/register", accountController.createAccount)
router.post("/login", accountController.loginAccount)

module.exports = router