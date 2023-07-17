const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { UserModel } = require("../model/user.model");


const userRouter = express.Router();



userRouter.post("/register",async(req,res)=>{
    try {
        const { username,email }=req.body;

        const accessToken = jwt.sign({email:email},process.env.ACCESS_TOKEN_SECRET);
        const isUserExists = await UserModel.findOne({email});


        if(isUserExists) return res.status(400).send({msg:"User Already Exists!",token:accessToken})

        const newUser = new UserModel({username,email});
        await newUser.save();

      
        res.status(200).send({msg:"New User Created Succesfully!",token:accessToken})
    } catch (error) {
        res.status(400).send({msg:error.message});
    }
})




module.exports={
    userRouter
}