
const mongoose=require("mongoose")
const { Schema } = mongoose;

const wishlistschema = new mongoose.Schema({  // create schema  means crete the blueprint for variables

  userid:String,
  productid:Schema.Types.ObjectId,
  
});

let wishlist=mongoose.model('wishlist',wishlistschema) //model for user collec and schema placed inside the user collec


module.exports=wishlist;