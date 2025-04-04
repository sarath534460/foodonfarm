let usermodel=require("../models/usersmodel.js")
let express=require("express")

let app=express()
let cookieparser=require("cookie-parser")
app.use(cookieparser())

const fast2sms = require('fast-two-sms')
let jwt=require("jsonwebtoken")
const redis = require('redis');
const client = redis.createClient({
    url: "redis://default:4F9Kh036Wvv8KvicoRMvcmfvFsQqn0an@redis-19403.c323.us-east-1-2.ec2.redns.redis-cloud.com:19403"
});

client.on('connect', () => {
  console.log('Connected to Redis');
});

client.on('error', (err) => {
  console.error('Redis Error:', err);
});

client.connect().catch((err) => {
    console.error("Failed to connect to Redis:", err);
});

let k=async(req,res)=>{
    try{

        const user = new usermodel({
            username:req.body.username,
            mobileno: req.body.mobileno,
            email: req.body.email,
            password:req.body.password,
            id:Object
        });

        let mobil= await usermodel.find({mobileno:req.body.mobileno})
        let emai=  await usermodel.find({email:req.body.email})

        if(mobil.length!=0){
            res.json({message:"already mobileno registered"})
        }
        else if(emai.length!=0){
            res.json({message:"already email registered"})
        }
        else {
            let y=await user.save()
            console.log(req.body)
            console.log(y)
            res.json({message:"successfully registered"})
        }
       

    }

    catch(err){
        console.log(err)
    }
    
}

let sendotp=async(req,res)=>{

    let findmob=await usermodel.findOne({mobileno:req.body.mobile})

    if(findmob==null){
        res.json({message:"mobileno not registered",otpsent:false})
    }
    else{
        try {
            console.log(req.body);
          
            const otp = Math.floor(Math.random() * 9000) + 1000;

            console.log("actual otp",otp);
          //  const expirationTime = Date.now() +  2* 1000;
    
            //await client.connect();  
            // Set OTP in Redis with an expiration time of 5 minutes
            await client.setEx(req.body.mobile, 60, otp.toString());
    
          // Send OTP via Fast2SMS API
            // const response = await fast2sms.sendMessage({
            //     authorization: process.env.fasttoauthorization,
            //     sender_id: 'LKHMDS',
            //     message: `Your OTP code is ${otp}`,
            //     numbers: [Number(req.body.mobile)]
            // });
    
            //console.log(otp);
            res.json({ message: "OTP sent successfully" ,otpsent:true });
        } catch (err) {
            console.error("Error sending OTP:", err);
            res.status(500).json({ message: "Internal server error" });
        } finally {
              // Ensure Redis client is disconnected after all operations
        }

    }

   
}

let verifyotp=async(req,res)=>{
     console.log("hduduud",req.body.otps,req.body.mobile)

     console.log("hi",req.body.mobile.mobile)
     console.log(req.body.mobile)
  try{
    const otp = await client.get(req.body.mobile.mobile);
    console.log("from redis",otp)
    if (otp==req.body.otps) {
        let token=jwt.sign({mobile:req.body.mobile.mobile},process.env.SECRET, { expiresIn: '200m' })
        console.log(token)
        res.cookie("token", token, {
            httpOnly: true, // Prevents access from JavaScript
            secure: true,   // Ensures HTTPS usage in production
            sameSite: "Strict", // Prevents CSRF attacks
            maxAge:200*60*1000// 1 hour expiry
        });
        return res.json({ message: 'OTP matched successfully. Token sent in cookie.',flag:true });

    } else if(otp==null){
        return res.json({ message: ' OTP IS TIMER UP',flag:"timeup" });

    }
    else{
        return res.json({ message: ' invalid otp',flag:"invalidotp" });

    }
 }
 catch(err){
    console.log(err)
 }

 
}


let logout=(req,res)=>{
     console.log(req.cookies?.token)
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,    // Ensure this works over HTTPS
        sameSite: 'Strict', // Prevent CSRF attacks
      });
      res.status(200).json({ message: 'Logged out successfully' });
}




let acdetails=async (req,res)=>{
    try{
    let userdata=await usermodel.findOne({mobileno:req.user.mobile})
    console.log(userdata)
    res.json({message:userdata})
    }
    catch(err){
        console.log(err);
        
    }
}

let uio=(req,res)=>{
    console.log("actualtoken",req.cookies.token)
    console.log(req.headers.cookie)
    console.log(req.body)
    res.json("hi")
    console.log(req.user)
}
module.exports={k,sendotp,verifyotp,logout,uio,acdetails}