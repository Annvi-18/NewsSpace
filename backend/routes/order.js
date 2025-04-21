const router = require("express").Router();
const User = require("../models/user");
const Book = require("../models/book");
const order = require("../models/order")
const {authenticate} = require("./userAuth");

router.post("/place-order", authenticate, async(req,res) =>{
    try {
        console.log("place order")
        const {id} = req.headers;
        const {bookid} = req.body;

        console.log("bookid :", bookid)

        const bookData = await Book.findById(bookid);
        const newOrder = new order({user:id, book: bookid});
        const orderDataFromDb = await newOrder.save();
        console.log("orderDataFromDb :", orderDataFromDb)
        
        return res.status(200).json({
            status:"Success",
            message:"order placed successfully"})

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"backedn error"});
        
    }
});

router.get("/get-order-history", authenticate, async(req,res) =>{
    try {
        const {id} = req.headers;
        const userData = await User.findById(id).populate({
       
            path: "orders"
        })
        const orderData = userData.orders.reverse();
        return res.status(200).json({
            status:"Success",
            message:"oly",
        data: orderData})

    } catch (error) {
        res.status(500).json({message:"backedn error"});
        console.log(error);
    }
});

router.get("/get-all-orders", authenticate, async(req,res) =>{
    try {
        const userData = await order.find()
        .populate({
            path: "book",
        })
        .populate({
            path: "user",
        })
        .sort({createdAt: -1});
        return res.status(200).json({
            status:"Success",
            data: userData
        })

    } catch (error) {
        res.status(500).json({message:"backedn error"});
        console.log(error);
    }
});

router.put("/updatestatus/:id",authenticate, async(req,res)=>{
    try {
        const {id} = req.params;
        await order.findByIdAndUpdate(id,{
            status: req.body.status
        });
        return res.status(200).json({
            status:"Success",
            message:"status updasted successfully"
        })
    } catch (error) {
        res.status(500).json({message:"backedn error"});
        console.log(error);
    }
})

module.exports = router;



// 67b9ecc3d7d1609c1935ad53


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoQ2xhaW1zIjpbeyJuYW1lIjoic29tZXRoaW5nIn0seyJyb2xlIjoidXNlciJ9XSwiaWF0IjoxNzQxNzEzNDkwLCJleHAiOjE3NDQzMDU0OTB9.s6RKPf9ww4nSdG9Hm3dKWa90DdOcehdmYzT6YIDPymg