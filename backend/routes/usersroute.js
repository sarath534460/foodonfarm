let express=require("express")

let userrouter=express.Router()
let u=require("../controllers/userscontroller.js")


userrouter.post('/register',u.k)

userrouter.post('/login',u.sendotp)

userrouter.post('/verifyotp',u.verifyotp)

userrouter.get('/acdetails',u.acdetails)

userrouter.get('/logout',u.logout)

userrouter.post('/test',u.uio)

module.exports=userrouter