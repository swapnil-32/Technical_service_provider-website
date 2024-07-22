const mongoose=require('mongoose')
const { Schema } = mongoose;
const contactschema=new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    }
})
module.exports=mongoose.model('Contact',contactschema);