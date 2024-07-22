const Contact=require('../models/contact_model')
const contactForm=async (req,res)=>{
    try {
        const response=req.body;
        await Contact.create(response);
        res.json({message:"message sent successfully"})
    } catch (error) {
        res.json({message:'error'});
    }
}
module.exports=contactForm;