let express=require("express")
let cartcontroller=require('../controllers/cartcontroller.js')
let cartrouter=express.Router()


cartrouter.get('/getcarts',cartcontroller.getcart)

cartrouter.post('/insertcart',cartcontroller.insertcart)

cartrouter.post('/inc',cartcontroller.inc)

cartrouter.post('/desc',cartcontroller.desc)



module.exports=cartrouter