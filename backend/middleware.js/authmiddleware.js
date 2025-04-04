let jwt=require("jsonwebtoken")



let jwtmiddleware=(req,res,next)=>{
    
    let token=req.cookies.token
    if (req.path === "/users/login"||req.path === "/users/verifyotp") {
      console.log(6567)
      return next();
    }


    if (!token) {
        console.log("from the nottokenavil",token)
        res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "Strict" });
        return res.json({message:"unauthorized",flag:"NOTOKEN"})
        //logout auti
    }
     else if(token){
        jwt.verify(token, process.env.SECRET, (err, decoded) => {

            let currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
           let timeLeft = decoded.exp - currentTime; // Calculate remaining time

          if(err){
            console.log("tokenin err")
            res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "Strict" });

           return  res.json({message:"token is invalid",flag:"TOKENERROR"})
          }

          else if(timeLeft<=0){
            console.log("from the timenottoken",token)

            res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "Strict" });

            return  res.json({message:"token time is over",flag:"TOKENTIMELEFT"})

          }

          else{

            req.user = decoded; // Attach decoded payload to request
            next();

          }

        })

      }
    
}

module.exports=jwtmiddleware