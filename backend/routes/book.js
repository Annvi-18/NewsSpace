const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const {authenticate} = require("./userAuth");
const Book = require("../models/book");

// old book --> admin
router.post("/addbook",authenticate,async(req,res)=>{
    try {
        const {id} = req.headers;
        const user = await User.findById(id)

         if(user.role != "admin"){
            return res.status(400).json({message:"not an admin no access"});

         }

        const book = new Book({
            url:req.body.url,
            title:req.body.title, 
            author:req.body.author,
            price:req.body.price,
            desc:req.body.desc,
            language:req.body.language
        });
        await book.save();
        res.status(200).json({message:"book added"})
        console.log("book added");
    } catch (error) {
        res.status(500).json({message:"backedn error"});
        console.log(error);
    }
})
router.post("/updatebook",authenticate,async(req,res)=>{
    try {
        const {id} = req.headers;
    const book = await Book.findByIdAndUpdate(id,{
        url:req.body.url,
            title:req.body.title, 
            author:req.body.author  ,
            price:req.body.price,
            desc:req.body.desc,
            language:req.body.language
    });
    return res.status(200).json({message:"book updated successfully"});
    } catch (error) {
        res.status(500).json({message:"backedn error"});
        console.log(error);
    }
})
router.delete("/deletebook",authenticate,async(req,res)=>{
    try {
        const {bookid} = req.headers;
    const book = await Book.findByIdAndDelete(bookid);
    console.log(book);
    if(!book){
        return res.status(400).json({message:"book not found"});
    }
    return res.status(200).json({message:"book deleted successfully"});
    } catch (error) {
        res.status(500).json({message:"backedn error"});
        console.log(error);
    }
})
router.get("/getallbooks",async(req,res)=>{
    try {
        const books = await Book.find().sort({createdAt: -1});
        return res.json({
            status:"Success",
            data:books
    })
    } catch (error) {
        return res.send(500).json({message:"internal shit"});
        console.log(error);
    }
})
// get recent or top four books 
router.get("/getrecentbooks",async(req,res)=>{
    try {
        const books = await Book.find().sort({createdAt: -1}).limit(45);
        return res.json({
            status:"Success",
            data:books
    })
    } catch (error) {
        return res.send(500).json({message:"internal shit"});
        console.log(error);
    }
})

router.get("/get-book-by-id/:id", async(req,res) =>{
    try {
        const {id} = req.params;
        const book = await Book.findById(id);
        return res.json({
            status:"Success",
            data:book
        })
    } catch (error) {
        return res.send(500).json({message:"internal shit"});
        console.log(error);
    }
})

module.exports = router;
