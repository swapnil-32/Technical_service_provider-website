const errorMiddleware=(err,req,res,next)=>{
    const status=err.status || 500
const message=err.message || "BACKEND ERROR";    //if any error message not passed then it send bckend error
const extraDetails=err.extraDetails || "Error from backend";     //here also if any extra details are there otherwise error from backend comes
return res.status(status).json({message,extraDetails});
}
module.exports=errorMiddleware;
