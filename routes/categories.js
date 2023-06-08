const router = require("express").Router()
const {saveCategory,fetchCategory} = require("../controller/category")
const {verifyToken} = require("../middlewares/verifyToken")

router.post('/category',verifyToken,saveCategory)

router.get("/category",verifyToken,fetchCategory)
module.exports = router;