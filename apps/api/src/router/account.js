const router = require('express').Router()
const { accountController } = require("../controller")
const { validateToken } = require('../middleware/validation')

router.post("/register", accountController.createAccount)
router.post("/login", accountController.loginAccount)
router.get("/keeplogin", validateToken, accountController.keepLogin)

module.exports = router