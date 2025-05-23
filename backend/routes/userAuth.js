const jwt = require("jsonwebtoken");

const authenticate = (req,res,next) =>{
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(token == null){
        return res.status(401).json({message:"auth token reqd"});
    }
    
    jwt.verify(token, "bookstore123", (err,user) =>{
        if(err){
            return res.status(403).json(err)
           console.log(err);
        }
        req.user = user;
        next();
    });
};

module.exports = {authenticate};