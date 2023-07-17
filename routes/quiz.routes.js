const express = require("express");
const { QuizModel } = require("../model/quiz.model");
const { relationship } = require("../middleware/reationship");


const quizRouter = express.Router();


quizRouter.get("/",async(req,res)=>{
     try {
        const quizzes = await QuizModel.find({});
        res.status(200).send(quizzes);
     } catch (error) {
        res.status(400).send({msg:error.message}); 
     }
})


quizRouter.get("/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const quiz = await QuizModel.findOne({_id:id});
        res.status(200).send(quiz)
     } catch (error) {
        res.status(400).send({msg:error.message}); 
     }
})



quizRouter.post("/add",relationship,async(req,res)=>{
    try {
       const newQuiz = new QuizModel({...req.body});
       await newQuiz.save();
       res.status(201).send({"msg":"New quiz added"})
     } catch (error) {
        res.status(400).send({msg:error.message}); 
     }
})


quizRouter.delete("/:id",async(req,res)=>{
    const { id } = req.params;
    try {
        await QuizModel.findByIdAndDelete({ _id: id });
        res.status(200).send({ msg: "Quiz data deleted successfully!" })
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
})



module.exports={
    quizRouter
}