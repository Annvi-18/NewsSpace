const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {authenticate} = require("./userAuth")

// signup 
router.post("/signup",async (req,res)=>{
    try {
        const {username, email, password, address} = req.body;
        console.log(req.body);
5
        // check lenght of username 
        if(username.lenght < 4){
            console.log("chota naam")
            return res.status(401).json({message:"username lenght shd be greater than 3"});
        }

        // check if isername already exists 
        const existingUsername = await User.findOne({username: username});
        if(existingUsername){
            console.log("existing user")
            return res.status(402).json({message:"username exists"})
        }
        
        // check if email already exists 
        const existingemail = await User.findOne({email:email});
        if(existingemail){
            console.log("email alreafy used")
            return res.status(403).json({message:"email exists"})
        }

        // check password lenght 
        if(password.lenght < 5){
            console.log("password too small")
            return res.status(404).json({message:"username lenght shd be greater than 3"});
        }

        const hashPass = await bcrypt.hash(password,10);

        const newUser = new User({username:username, email:email, password:hashPass, address:address});
        
        // save
        await newUser.save();
        return res.status(200).json({message:"user added to sb"})

        // note:
        // findone k bina error aare the 

    } catch (error) {
        res.status(500).json({message:"backedn error"});
        console.log(error);
    }
})

// sign in 
router.post("/login",async (req,res)=>{
    try {
        const {username,password} = req.body;

        const existingUser = await User.findOne({username});
        // console.log(existingUser.username);
        if(!existingUser){
            res.status(400).json({message:"invalid credentials"});
        }

        await bcrypt.compare(password,existingUser.password,(err,data) =>{
            if(data){
                console.log("got data");
                const authClaims = [
                    {name: existingUser.username},
                    {role: existingUser.role}
                ];

                // token banaya 
                const token = jwt.sign({authClaims}, "bookstore123",{
                    expiresIn: "30d"
                });

                res.status(200).json({id:existingUser._id,
                    role: existingUser.role,
                    token:token
                });
            }
            else{
                res.status(400).json({message: "invalid credentials ytf"});
            }
        });

    } catch (error) {
        res.status(500).json({message:"backedn error"});
        console.log(error);
    }
})

// get user info  
router.get("/get-user-info",authenticate, async(req,res)=>{
    try {
        console.log("got user info");
        const {id} = req.headers;
        const data = await User.findById(id).select('-password');
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message:"inernal error try again"});
    }
})

// update address 
router.put("/update-address", authenticate, async(req,res)=>{
    try {
        const id = req.headers;
        const {address} = req.body;
        await User.findByIdAndUpdate({id,address:address});
        return res.status(200).json({message:"updated"})
    } catch (error) {
        res.status(500).json({message:"internal server error"})
    }
})

module.exports = router;