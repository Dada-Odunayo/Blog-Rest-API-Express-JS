const Post = require("../model/Post")
const {validationResult} = require("express-validator")

exports.addPost = async(req,res)=>{
    try{   
            const errors = validationResult(req)            
            if(!errors.isEmpty()){
                const errorMsg = errors.array().map((error)=>error.msg)
                return res.status(401).json({msg:errorMsg})
            }
            const newPost = new Post(req.body)
            console.log(newPost)
            await newPost.save()            
            return res.status(201).json({msg:'Post saved successfully'})
    }
    catch{
        return res.status(500).json({msg:'Could not save post. Try Again'})
    }
}

exports.updatePost = async(req,res)=>{
    try{
        const errors = validationResult(req)            
            if(!errors.isEmpty()){
                const errorMsg = errors.array().map((error)=>error.msg)
                return res.status(401).json({msg:errorMsg})
            }
        const post = await Post.findById(req.params.id)        
        if(!post){
            return res.status(404).json({msg:'User not found'})
        }
        if(post.username === req.body.username){
            try{
                   await Post.findByIdAndUpdate(req.params.id,{
                    $set: req.body
                   },
                   {new:true})
                   return res.status(200).json({msg:'Post updated successfully'})
            }
            catch{
                return res.status(500).json({msg:'Could not update post.Try again'})
            }
        }
        else{
            return res.status(401).json({msg:'You are not authorized to update this post'})
        }
    }
    catch{
        return res.status(500).json({msg:'Something went wrong.Please Try again'})
    }
}

exports.deletePost = async(req,res)=>{
    try{        
        const post = await Post.findById(req.params.id)              
        if(!post){
            return res.status(404).json({msg:'User not found'})
        }
        if(post.username === req.body.username){
            try{
                
                   await post.deleteOne()
                   return res.status(200).json({msg:'Post deleted successfully'})
            }
            catch{
                return res.status(500).json({msg:'Could not delete post.Try again'})
            }
        }
        else{
            return res.status(401).json({msg:'You are not authorized to delete this post'})
        }
    }
    catch{
        return res.status(500).json({msg:'Something went wrong.Please Try again'})
    }
}

exports.fetchPost= async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        if(post){
            return res.status(200).json({post})
        }
        return res.status(404).json({msg:'Post not found'})
    }
    catch{
        return res.status(500).json({msg:'Something went wrong. Please try again'})
    }
}

exports.fetchAllPosts= async(req,res)=>{
    let posts;
    try{
        const username = req.body.username
        const category = req.body.category
        if(username){
            posts = await Post.find({username:username})
        }
        else if(category){
            posts = await Post.find({
                categories:{
                    $in:[category]
                }
            })
        }
        res.status(200).json(posts)               
    }
    catch{
        return res.status(500).json({msg:'Something went wrong. Please try again'})
    }
}