const express = require("express");
const dotenv = require("dotenv")
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const auth = require("./routes/auth")
const users = require("./routes/users")
const posts = require("./routes/posts")
const categories = require("./routes/categories")

dotenv.config()
const app = express()
app.use(express.json())
const port = process.env.PORT;

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
  })
  .then(()=>{
    console.log("Connected to mongodb")
  })
  .catch((err)=>{
    console.log(`Error ${err}`)
  })


app.use(auth)
app.use(users)
app.use(posts)
app.use(categories)

app.listen(port,()=>{
    console.log(`Running on ${port}`)
})