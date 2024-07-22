const mongoose=require("mongoose");
const {Schema}=mongoose
const serviceschema=new Schema({
    service:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    provider:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model("Service",serviceschema);