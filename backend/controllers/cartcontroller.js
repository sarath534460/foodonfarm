let cartmodel=require("../models/cartmodel.js")

 let getcart=async(req,res)=>{
   console.log(req.user.mobile)
   let y=  await cartmodel.find({userid:req.user.mobile})
   console.log(y)
   res.json({message:y})
  } 
 

let insertcart=async(req,res)=>{

   /*let y=  await cartmodel.find({userid:req.user.mobile,"carts.selectedweight.weight":req.body.product.selectedweight.weight,"carts._id":req.body.product._id})*/
   let y = await cartmodel.find({
    userid: req.user.mobile,
    carts: {
      $elemMatch: {
        _id: req.body.product._id,
        "selectedweight.weight": req.body.product.selectedweight.weight
      }
    }
  }, { "carts.$": 1 })
   console.log(y)
   if(y.length==0){
    let s= await cartmodel.updateOne({userid:req.user.mobile},{$push:{"carts":req.body.product}})
    res.json({message:s})
   }

   else{
    let y=  await cartmodel.updateOne({userid:req.user.mobile,"carts.selectedweight.weight":req.body.product.selectedweight.weight,"carts._id":req.body.product._id}
      ,{$set:{"carts.$.quantity":req.body.product.quantity}})

    res.json(({message:"incremented"}))
   }
  
}

let inc=async(req,res)=>{
req.body.product.quantity++
 let y=  await cartmodel.updateOne({userid:req.user.mobile,"carts.selectedweight.weight":req.body.product.selectedweight.weight,"carts._id":req.body.product._id}
    ,{$set:{"carts.$.quantity":req.body.product.quantity}})

   res.json({message:"incremented"})
}



let desc=async(req,res)=>{
   req.body.product.quantity--
  let y=  await cartmodel.updateOne({userid:req.user.mobile,"carts.selectedweight.weight":req.body.product.selectedweight.weight,"carts._id":req.body.product._id}
     ,{$set:{"carts.$.quantity":req.body.product.quantity}})
 
     res.json({message:"incremented"})

}

// let inc = async (req, res) => {
//   let updateResult = await cartmodel.findOneAndUpdate(
//       {
//           userid: req.user.mobile,
//           "carts.selectedweight.weight": req.body.product.selectedweight.weight,
//           "carts._id": req.body.product._id
//       },
//       { $inc: { "carts.$.quantity": 1 } }
//       // ,
//       // { new: true, projection: { carts: 1 } } // Only return carts
//   );

//   res.json({ message: "incremented", cart: updateResult });
// };

// let desc = async (req, res) => {
//   let updateResult = await cartmodel.findOneAndUpdate(
//       {
//           userid: req.user.mobile,
//           "carts.selectedweight.weight": req.body.product.selectedweight.weight,
//           "carts._id": req.body.product._id,
//       },
//       { $inc: { "carts.$.quantity": -1 } }
//       //,
//      // { new: true, projection: { carts: 1 } }
//   );

//   res.json({ message: "decremented", cart: updateResult.carts });
// };


module.exports={insertcart,getcart,inc,desc}