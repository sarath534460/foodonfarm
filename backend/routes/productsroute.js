let express=require("express")
let productcontroller=require('../controllers/productscontroller.js')
let productrouter=express.Router()
let multer=require('multer')

const ds=multer.diskStorage({
    destination:(req,file,cb)=>{
     cb(null,"uploads/")
    },
     filename:(req,file,cb)=>{
    
     cb(null,Date.now()+file.originalname)
    
     }
    });
    
    const upload =multer({
     storage:ds
    });


productrouter.post('/addproduct',upload.any(),productcontroller.addproduct)

productrouter.get('/getproducts/:categname',productcontroller.getproducts)

productrouter.get('/getproductbyid/:id',productcontroller.getproductbyid)



module.exports=productrouter