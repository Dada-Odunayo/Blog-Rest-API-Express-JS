const router = require("express").Router()
const {addPost,updatePost,deletePost,fetchPost,fetchAllPosts} = require("../controller/post")
const {validatePost} = require("../middlewares/validateEntry")
const {verifyToken} = require("../middlewares/verifyToken")

//add a post
router.post("/posts",verifyToken,validatePost,addPost)

//update a single post
router.put("/update-post/:id",verifyToken,validatePost,updatePost)

//delete a single post
router.delete("/delete-post/:id",verifyToken,deletePost)

//fetch all posts
router.get("/fetch-all-posts",verifyToken, fetchAllPosts)

//fetch a single post
router.get("/fetch-post/:id",verifyToken,fetchPost)



module.exports = router;