const router = require("express").Router();
const User = require("../models/user");
const Book = require("../models/book");
const {authenticate} = require("./userAuth");

router.put("/addToCart", authenticate, async (req,res)=>{
    try {
         const {bookid, id} = req.headers;
            const userData = await User.findById(id);
            const isBookadded = userData.cart.includes(bookid);
            if(isBookadded){
                return res.status(200).json({
                    status:"Success",
                    message: "already in cart"
                })
            }
            await User.findByIdAndUpdate(id,{
                $push:{ cart: bookid}
            });
            return res.status(200).json({
                status: "Success",
                message:"added to cart"})
    } catch (error) {
        res.status(500).json({message:"backedn error"});
        console.log(error);
    }
 });

router.delete("/deleteFromCart",authenticate,async (req,res)=>{
    try {
        const {bookid, id} = req.headers;
    const userData = await User.findById(id);
    const isBookinCart = userData.cart.includes(bookid);
    // console.log(userData.)clear
    if(isBookinCart){
        await User.findByIdAndUpdate(id, {$pull: {cart: bookid}});
        return res.status(200).json({message:"removed to cart"});
    }
       
       return res.status(200).json({message:"not in cart"});
        
    } catch (error) {
        res.status(500).json({message:"book add krne me dikkat"});
        console.log(error);
    }
})

router.get("/getAllinCart", authenticate, async(req,res)=>{
    try {
        const {id} = req.headers;
        const userData = await User.findById(id).populate("cart");
        const itemsincart = userData.cart.reverse();
        return res.status(200).json({
            status:"Success",
            data: itemsincart,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"book add krne me dikkat"});
       
    }
})

module.exports = router;