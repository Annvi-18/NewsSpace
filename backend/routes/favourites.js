const router = require("express").Router();
const User = require("../models/user");
const {authenticate} = require("./userAuth");

// add to favourites 
router.put("/addToFavourites",authenticate,async (req,res)=>{
    try {
        const {bookid, id} = req.headers;
    const userData = await User.findById(id);
    const isBookFav = userData.favourites.includes(bookid);
    // console.log(userData.)clear
    if(isBookFav){
        return res.status(200).json({message:"already in favourites"});
    }
        await User.findByIdAndUpdate(id, {$push: {favourites: bookid}});
        return res.status(200).json({message:"added to favourites"});
        
    } catch (error) {
        return res.status(500).json({message:"book add krne me dikkat"});
        console.log(error);
    }
})

router.delete("/deleteFromFavs",authenticate,async (req,res)=>{
    try {
        const {id,bookid} = req.headers;
        console.log("backend me mila",bookid,id)
    const userData = await User.findById(id);
    const isBookFav = userData.favourites.includes(bookid);
        console.log(isBookFav);
    // console.log(userData.)clear
    if(isBookFav){
        await User.findByIdAndUpdate(id, {$pull: {favourites: bookid}});
        console.log("done")
        return res.status(200).json({message:"removed to favourites"});
    }
       
   
        
    } catch (error) {
        return res.status(500).json({message:"book add krne me dikkat"});
        console.log(error);
    }
})

router.get("/getAllFavs", authenticate, async(req,res)=>{
    try {
        const {id} = req.headers;
        const userData = await User.findById(id).populate("favourites");
        const favouritebooks = userData.favourites;
       return res.status(200).json({
            status:"Success",
            data: favouritebooks,
        });
    } catch (error) {
        return res.status(500).json({message:"book add krne me dikkat"});
        console.log(error);
    }
})

module.exports = router;