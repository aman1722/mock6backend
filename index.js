const express = require("express");
const { connection } = require("./connection/db");
require("dotenv").config();
const cors = require("cors");
const { userRouter } = require("./routes/user.routes");
const { relationship } = require("./middleware/reationship");
const { quizRouter } = require("./routes/quiz.routes");





const app = express();



app.use(express.json());
app.use(cors());
app.get("/",(req,res)=>{
    res.send("Home Page!")
})

app.use("/user",userRouter)


app.use("/quiz",quizRouter)












app.listen(process.env.PORT,async()=>{
    try {
        await connection;
        console.log("Connected to db!")
    } catch (error) {
        console.log("Unable to connect db");
        console.log(error.message);
    }
    console.log(`Server is running on the port ${process.env.PORT}!`)
})