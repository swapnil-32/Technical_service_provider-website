const mongoose=require('mongoose')
const jwt=require("jsonwebtoken");    //use for authintication and autherisation
const bcrypt=require('bcryptjs')
const { Schema } = mongoose;
const userschema=new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now()
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
})

//tokens such as jwt are not stored in database/server it will stored on client side(ex.cookies). server is generating us token and give us
//we can create number of methods/function using userscheam.methods and this is called instance method
userschema.methods.generateToken=async function(){       //this jwt function we call in auth_controller file
    try{
        return jwt.sign(
            {
                userId:this._id.toString(),
                email:this.email,                            //this first paraemeter is called payload of jwt.payload is user identity that we want to share  and payload is stored in string so we need to convert id into string rest all are already in string
                isAdmin:this.isAdmin           //at time of verify only this userud,email and isadmin will display
            },
            process.env.JWT_SECRET_KEY,                     //this second parameter called as secret key 
            {
                expiresIn:"30d"       //this last{} parameter is optional here it tells that it expires in 30 days
            }
        )
    }
    catch(error){
        console.log(error);
    }
}


userschema.methods.comparepassword=function(password){
    return bcrypt.compare(password,this.password);
}
module.exports=mongoose.model('user',userschema);