
const mongoose=require("mongoose")
const userSchema = new mongoose.Schema({  // create schema  means crete the blueprint for variables
//   username: {
    // type: String,
   // required: [true, 'Name is required'], // Field is required with a custom error message

   // minlength: [3, 'Name must be at least 3 characters long'], 
   // maxlength: [50, 'Name must be less than 50 characters long'], 
//   },

  username:String,
  mobileno: String,
  email: String,
  password:String,
  id:Object
});

let user=mongoose.model('users',userSchema) //model for user collec and schema placed inside the user collec


module.exports=user;