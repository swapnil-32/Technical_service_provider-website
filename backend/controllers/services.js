const Service=require("../models/service_model")
const services=async(req,res)=>{
try {
    const response=await Service.find();
    if(!response){
        res.json({msg:"no service found"});
        return;
    }
    res.json({msg:response});
} catch (error) {
    console.log(`services ${error}`);
}
}
module.exports=services;