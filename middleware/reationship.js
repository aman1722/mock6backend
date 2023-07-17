
const jwt = require("jsonwebtoken");
require("dotenv").config();







const relationship = async(req,res,next)=>{
      try {
        const token = req.headers.authorization.split(" ")[0] || req.headers.authorization;


        if (token) {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            console.log(decoded);
            if (decoded) {
                req.body.quiz.creator = decoded.email;
                next()
            }else{
                res.status(400).send({msg:"please Register First!"})
            }
        }else{
            res.status(400).send({msg:"please register First!"})
        }
      } catch (error) {
        res.status(400).send({msg:error.message})
      }
}



module.exports={
    relationship
}