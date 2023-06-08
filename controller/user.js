const bcrypt = require("bcrypt")
const User = require("../model/User")
const Post = require("../model/Post")

exports.updateUser = async(req,res)=>{
    if(req.body.userId === req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(12);
            req.body.password = await bcrypt.hash(req.body.password,salt)
        }

        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            },{new:true})
            const {password,...other} = updatedUser._doc;
            return res.status(200).json(other)
        }
        catch{
            return res.status(500).json({msg:'Something went wrong. Try again'})
        }
    }
    else
    {
        return res.status(401).json({msg:'You can only update your account'})
    }
}

exports.deleteUser = async(req,res)=>{
    if(req.body.userId === req.params.id){
        

        try{
            const user = await User.findOne({_id:req.params.id})
            try{
                if(!user){
                    return res.status(404).json({msg:'User does not exist'})
                }
                await Post.deleteMany({username:user.username})
                await User.findByIdAndDelete(req.params.id)                
                return res.status(200).json({msg:"User successfully deleted"})
            }
           catch{
                return res.status(500).json({msg:"Something went wrong"})
           }
        }
        catch{
            return res.status(500).json({msg:'Something went wrong. Try again'})
        }
    }
    else
    {
        return res.status(401).json({msg:'You can only delete your account'})
    }
}

