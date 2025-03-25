const express=require("express")
const app=express()
const mongoose=require("mongoose")
const PORT=4000
app.use(express.json())
require("dotenv").config()
const route=require("./crud")

const uri=process.env.uri
mongoose.connect(uri)
.then(()=>{
    console.log("Database connected")
})
.catch((err)=>{
    console.log("Error in connecting",err)
})

app.use("/api",route)

app.listen(PORT,(req,res)=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})