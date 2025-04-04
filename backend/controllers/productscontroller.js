let categorymodel=require("../models/categorymodel.js")
const mongoose=require("mongoose")
const fs=require('fs')
const { Schema } = mongoose;
let mongodb=require('../mongodb.js')
let productsmodel;
const { ObjectId } = require('mongodb'); 

let addproduct=async(req,res)=>{
  console.log(req.body.data)
  console.log(req.files)
  let datbody=JSON.parse(req.body.data)

  let prodts={}
 // making schema start here
 try{
  for(let x in datbody){
    let ui=typeof(datbody[x])
      
    if(Array.isArray(datbody[x])){
       let q={}
     for (let i in datbody[x][0]){
       let ty=typeof(datbody[x][0][i])
       q[i]=ty.charAt(0).toUpperCase()+ty.slice(1)
     }
      prodts[x]=[q]
    
    }
    else{

    
     prodts[x]=ui.charAt(0).toUpperCase()+ui.slice(1)
     if(req.files){
      req.files.forEach((xo)=>{
        if(xo.fieldname==x){
          prodts[x]=Buffer
        }
      })
    }

    }

  }
 
  }
  catch(err){
    console.log(err)
  }
  //ends of making schema 

  console.log(prodts)
  prodts.categoryid={type:Schema.Types.ObjectId,ref:'category',required:true}

  let catys=await categorymodel.findOne({categoryname:datbody.categoryname})

  datbody.categoryid=catys._id

  const productschema = new mongoose.Schema(prodts);



    // let productsmodel;
    try {
      // Try to retrieve the existing model
      productsmodel = mongoose.model('products');
    } catch (error) {
      // If model doesn't exist, define it
      const productschema = new mongoose.Schema(prodts);
      productsmodel = mongoose.model('products', productschema);
    }

    if (req.files) {
      req.files.forEach((x)=>{
           for(let i in datbody){
             if(x.fieldname==i){
              datbody[i]=fs.readFileSync(x.path)
             }
           }
      })
      
    }

  const newProduct = new productsmodel(datbody); // Save req.body directly

   let productssaved=await newProduct.save()

}


let getproducts = async (req, res) => {
  try {
    console.log(req.params.categname)
    // Ensure MongoDB connection is established before making a query
    await mongodb.mongoconnec(); 

    // Retrieve the database instance
    const db = mongodb.getDB();

    console.log(" Fetching products from the database...");
     
    // Query the 'products' collection
     let products = await db.collection('products').find({categoryname:req.params.categname}).toArray();

    console.log(" Products fetched successfully:", products.length);
    res.json({ message: products });


  } catch (err) {
    console.error(" Error fetching products:", err);
    //res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
  
};

let getproductbyid=async(req,res)=>{
  console.log(typeof(req.params.id))
  console.log(req.user)

  try {
    // Ensure MongoDB connection is established before making a query
    await mongodb.mongoconnec(); 

    // Retrieve the database instance
    const db = mongodb.getDB();

    console.log(" Fetching products from the database...");
     
    // Query the 'products' collection
     let product = await db.collection('products').findOne({_id: new ObjectId(req.params.id)})
     console.log(product)

    res.json({ message: product });


  } catch (err) {
    console.error(" Error fetching products:", err);
    //res.status(500).json({ message: 'Error fetching products', error: err.message });
  }

}

module.exports={addproduct,getproducts,getproductbyid}