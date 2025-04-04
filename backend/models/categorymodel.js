
const mongoose=require("mongoose")
const categorySchema = new mongoose.Schema({  // create schema  means crete the blueprint for variables

  categoryname:String,
  description:String,
  categoryimage:Buffer,
  id:Object
});

let categorymodels=mongoose.model('category',categorySchema) //model for user collec and schema placed inside the user collec


module.exports=categorymodels;