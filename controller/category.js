const Category = require("../model/Category");

exports.saveCategory = async(req,res)=>{       
    try{
        const newCategory = new Category(req.body)        
         await newCategory.save()
        return res.status(200).json({msg:'Category saved'})
    }
    catch{
        return res.status(500).json({msg:'Cannot fetch category now. Try again'})
    }
}

exports.fetchCategory = async(req,res)=>{
    
    try{
        const categories = await Category.find()
        console.log(categories)
        return res.status(200).json(categories)
    }
    catch{
        return res.status(500).json({msg:'Cannot fetch categories at the moment. Try again'})
    }
}