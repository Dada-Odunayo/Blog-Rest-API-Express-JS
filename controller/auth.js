const User = require("../model/User")
const uuid = require("uuid")
const bcrypt =  require("bcrypt")
const {validationResult} = require("express-validator")
const jwt = require("jsonwebtoken")



exports.registerUserController=async(req,res)=>{
    try{    
    const errors = validationResult(req)
    if(!errors.isEmpty()){
       return res.status(400).json({error:errors.array().map((error)=>error.msg)})
    }
    const {email,username} = req.body
    const duplicateKey = await User.findOne({$or:[{email:email},{username:username}]})
    if(duplicateKey){

        if(duplicateKey.email === email && duplicateKey.username === email){        
            return res.status(409).json({email:`User with Email '${email}' and Username '${username}' already exists`})
        }
        if(duplicateKey.email === email ){
            return res.status(409).json({email:`User with Email '${email}' already exists`})
        }
        if(duplicateKey.username === username){
            return res.status(409).json({email:`User with Username '${username}' already exists`})
        }
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password,salt)
    const newUser = new User(
       {
        id:uuid.v4(), 
        username: req.body.username,
        email : email,
        password : hashedPassword
       }
        )
        const user = await newUser.save()            
        return res.status(201).json({msg:'User created successfully'})
    }
    catch(err){        
        if(err.code == 11000 && err.keyPattern && (err.keyPattern.email|| err.keyPattern.username)){
            return res.status(409).json({error:`${err.keyValue.email? err.keyValue.email: err.keyValue.username} already exists`})
        }        
        return res.status(500).json({message:"Something went wrong. Try again"})
    }
}

exports.loginUserController= async(req,res) =>{

    try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                const errorMsg = errors.array().map(error=>error.msg)
                return res.status(409).json({error:errorMsg})
            }

            const user = await User.findOne({email:req.body.email})
             //console.log(user)
            if(!user){
                return res.status(400).json({msg:'Invalid login credentials'})
            }
            const isPassword = await bcrypt.compare(req.body.password,user.password)
            //console.log(isPassword)
            if(!isPassword){
                return res.status(400).json({msg:'Invalid Credential'})
            }
            const {password, ...others} = user._doc
            
            const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '30s' });
            console.log(others)
            return res.status(200).json({success:{others,token}})
    }
    catch{
            return res.status(500).json({msg:'Something went wrong. Try again'})
    }
}