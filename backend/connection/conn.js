 const mongoose = require("mongoose");
 const conn = async () =>{
    try {
       await mongoose.connect("mongodb+srv://saumya:dimplerishi@cluster0.zlgbf.mongodb.net/bookstore");
       console.log("mongo connected")
    } catch (error) {
        console.log(error);
    }
 }

 conn();