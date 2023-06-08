const router = require("express").Router()
const {updateUser, deleteUser} = require("../controller/user")

router.put("/update/:id",updateUser)

router.delete("/delete/:id",deleteUser)

module.exports= router;