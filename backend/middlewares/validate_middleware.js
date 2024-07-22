const validate=(schema)=> async (req,res,next)=>{
    try{
        const parsebody=await schema.parseAsync(req.body);     //it will cheak user input(req.body) with as per schema declared(schema)
        req.body=parsebody;
        next();
    }
    catch(err){
        const status=422;
        const message="fill the input properly"
        const extraDetails=err.errors[0].message;     //this error is coming from auth_validator
        // const message=err.errors[0].message;     //errors is array and in this we first member that is message
        // console.log(message);
        // res.json({message:error});
        const error={
            status,
            message,
            extraDetails
        }
        console.log(error)
        next(error);   //here we use middleware  so if invalid input is given when register or login then this error go to error_middleware and then in that page 

        // const message=err.errors[0].message;     
        // const error={
        //     message                               //this also work propery 
        // }
        // next(error);

    }
}
module.exports=validate;