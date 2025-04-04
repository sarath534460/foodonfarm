let express=require("express")
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

let categoryrouter=express.Router()
let u=require("../controllers/categorycontroller.js")

categoryrouter.post('/addcategory',upload.single('file'),u.addcategory)

categoryrouter.get('/getcategories',u.getcategory)





module.exports=categoryrouter