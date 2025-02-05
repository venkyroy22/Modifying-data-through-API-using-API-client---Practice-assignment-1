const mongoose = require('mongoose')
const express = require('express')
require('dotenv').config()
const app = express()
app.use(express.json())
const menu = require('./schema')

mongoose.connect(process.env.DB_URL)
.then(()=>{
    console.log("Connected")
})
.catch(()=>{
    console.log("Error")
})


app.post("/menu", async(req,res)=>{
    try{
        const {name,description,price} = req.body
        const exist = await menu.findOne({name});
        if(exist){
            res.status(400).json({message: "Item already exists"})
        }else{
        const newItem = new menu({ name, description, price });
        await newItem.save();
        res.status(201).json({ message: "Menu item added", item: newItem });
        }
    }
    catch(error){
        res.status(500).json({ error: "Server error" });
    }
})

app.get("/menu", async(req,res)=>{
    try{
        const all = await menu.find();
        res.json(all)
    }
    catch(error){
        res.status(500).json({ error: "Server error" });
    }
})

app.listen(3000,()=>{
    console.log("Running")
})