const jwt = require("jsonwebtoken")

exports.verifyToken = (req,res,next)=>{
 try{
    const token = req.headers.authorization;
 if(!token){
    return res.status(401).json({msg:'You are not authorized'})
 }
 jwt.verify(token,'your_secret_key',(err,decodedToken)=>{
    if(err){
        return res.status(401).json({msg:'Invalid token'})
    }
    if(decodedToken.exp < Date.now()/1000){
       return res.status(401).json({msg:'Expired token'})
    }
    req.userId = decodedToken.userId;
    next();
 })}
 catch{
    return res.status(500).json({msg:'Something went wrong. Please try again'})
 }
}