let express=require("express")
let wishlistrouter=express.Router()
let u=require("../controllers/wishlistcontroller.js")

wishlistrouter.post('/adddeleteproductwishlist',u.addproduct)
wishlistrouter.get('/getproductss',u.getproductss)



module.exports=wishlistrouter
