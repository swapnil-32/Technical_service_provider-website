const jwt=require("jsonwebtoken")
const User=require("../models/User")
const authmiddleware=async(req,res,next)=>{
    const token=req.header("Authorization");   //in postman in header we select the type Authrisation and and its value as token
    if(!token){
        return res.json({msg:"unauthorised HTTP,token not provided"});
    }
    const jwtToken=token.replace("Bearer","").trim();        //in postman we provide data in header as key is Authorization and value is Bearer {token value}.so here we take only token part 
    console.log("token from auth middleware",jwtToken);  
    try {
        const isverified=jwt.verify(jwtToken,process.env.JWT_SECRET_KEY);
        console.log(isverified);      //this will display only feilds that are declared at time of token declaration in user.js
        
        const userdata=await User.findOne({email:isverified.email}).select({password:0});   //this means we select all atributes except password
        console.log(userdata);

req.user=userdata;
req.token=token;
req.userId=userdata._id;

        next();
    } catch (error) {
        return res.json({msg:"unotherised invalid token"});
    }    
    
}
module.exports=authmiddleware;