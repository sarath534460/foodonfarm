let categorymodel=require("../models/categorymodel.js")
let fs=require("fs")


let addcategory=async(req,res)=>{
  try{
  let dat=JSON.parse(req.body.data)
  console.log(dat)
  let fd=null
 // console.log(req.file.path)
  if(req.file?.path){
   fd=fs.readFileSync(req.file.path)
  console.log(fd)
 
  }


 const categoryy = new categorymodel({
  categoryname:dat.categoryname,
  description: dat.description,
  categoryimage:fd,
  id:Object
  });
  
 let categorysaved=await categoryy.save()

  res.json({name:"fghdf"})

 }
 catch(err){
  console.log(err)
 }
 
}

let getcategory=async(req,res)=>{
    try{
 let allcategories= await categorymodel.find({})
 const formattedCategories = allcategories.map(cat => ({
  ...cat.toObject(),
  categoryimage: cat.categoryimage.toString('base64') // Convert Buffer to Base64
}));
 res.json({message:formattedCategories})
    }
    catch(err){
      console.log(err)
    }
}






module.exports={addcategory,getcategory}