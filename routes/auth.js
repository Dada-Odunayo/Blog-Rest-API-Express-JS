const router = require("express").Router()
const {registerUserController,loginUserController} = require("../controller/auth")
const {validateRegistration,validateLogin} = require("../middlewares/validateEntry")

router.post('/register',validateRegistration,registerUserController)

router.post('/login',validateLogin,loginUserController)

module.exports  = router;