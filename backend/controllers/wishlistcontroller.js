 let wishlistmodel=require("../models/wishlistmodel.js")
 const { getproducts } = require("./productscontroller.js")


 let addproduct=async(req,res)=>{
    console.log(req.user)

     
 let u= await wishlistmodel.findOne({productid:req.body.id,userid:req.user.mobile})
  
  if(u){
    await wishlistmodel.deleteOne({productid:req.body.id,userid:req.user.mobile})
    res.json({message:"deleted"})
  }
  else{
  new wishlistmodel({
    userid:req.user.mobile,
    productid:req.body.id
   
  }).save()

  res.json({message:"inserted"})
  }
}

let getproductss=async(req,res)=>{

   let u= await  wishlistmodel.find({userid:req.user.mobile})
   let k= u.map(o=>{
        return o.productid
    })

    res.json({message:k})

}

module.exports={addproduct,getproductss}