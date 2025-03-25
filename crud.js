const express=require("express")
const book=require("./schema")
const route=express.Router()

route.post('/',async(req,res)=>{
    try{
        const {title,authour,genre,publishedYear,availableCopies,borrowedBy}=req.body
        if(!title||!authour||!genre||!availableCopies){
            res.status(400).json({message:"Fill the necessary option"})
        }
        const newUser=await book.create(req.body)
        res.status(201).json({message:"User created successful",data:newUser})
    }
    catch(err){
         res.status(500).json({message:"Internal server error"})
    }
})

route.get('/',async(req,res)=>{
    try{
    const data=await book.find()
    if(data.length===0){
        res.status(404).json({message:"No book found"})
    }
    res.status(200).json({message:"Fetching successful",value:data})
}
catch(err){
    res.status(500).json({message:"Internal server error"})
}
})

route.get('/:id',async(req,res)=>{
    try{
    const data=await book.findById(req.params.id)
    if(!data){
        res.status(404).json({message:"No book found"})
    }
    res.status(200).json({message:"Fetching successful",value:data})
}
catch(err){
    res.status(500).json({message:"Internal server error"})
}
})


route.put('/:id',async(req,res)=>{
    try{
    const change=await book.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!change){
        res.status(404).json({message:"No book found"})
    }
    res.status(200).json({message:"Updated successful",value:change})
}
catch(err){
    res.status(500).json({message:"Internal server error"})
}
})

route.delete('/:id',async(req,res)=>{
    try{
    const data=await book.findByIdAndDelete(req.params.id)
    if(!data){
        res.status(404).json({message:"No book found"})
    }
    res.status(200).json({message:"Deleted successful"})
}
catch(err){
    res.status(500).json({message:"Internal server error"})
}
})

module.exports=route