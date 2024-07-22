const adminmiddleware=async(req,res,next)=>{
    try {
        console.log(req.user);        //in auth_middleware where we cheack user is logged in or not. and there if any user is logged in then we set req.user=userdata so that data we need to access here to cheack that it is admin or not
        
        const adminRole=req.user.isAdmin;
        if(!adminRole){
            // alert("access denied user is not admin")
            return res.status(404).json({message:"access denied user is not admin"})
        }
        // res.status(200).json({msg:req.user.isAdmin});
        next();    //if user is admin then go to next middleware.when we not write this next() then it stuck here not go to further middleware/request
    } catch (error) {
        next(error);
    }
}
module.exports=adminmiddleware;
