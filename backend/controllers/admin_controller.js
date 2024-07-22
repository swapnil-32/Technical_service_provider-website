// const User=require("../models/User")
const User=require("../models/User")
const Contact=require("../models/contact_model")
const getallUsers=async(req,res,next)=>{
    try {
        const users=await User.find({},{password:0});
        console.log(`users ${users}`)
        if(!users || users.length===0){
            res.status(404).json({msg:"users not found"});
        }
        res.status(200).json(users);
        
    } catch (error) {
        console.log(error);
        next(error)
    }
}
const getallContacts=async(req,res)=>{
    try {
        const contacts=await Contact.find();
        console.log(contacts);
        if(!contacts || contacts.length===0){
            res.status(400).json({message:"contacts not found"})
        }
        res.status(200).json(contacts);
    } catch (error) {
        console.log(error);
        next(error)
    }
}



const deleteUserById=async(req,res)=>{
    try {
        const id=req.params.id;
        console.log(id);
        await User.deleteOne({_id:id});
        return res.status(200).json({msg:"user deleted successfully"});
    } catch (error) {
        next(error)   //we send error to middleware
    }
}

const getUserById=async(req,res)=>{
    try {
        const id=req.params.id;
        const data=await User.findOne({_id:id},{password:0});
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}


const updateUserById=async(req,res)=>{
    try {
        const id=req.params.id;
        // return res.status(200).json(id);
        const updatedUser=req.body;
        const updatedData=await User.updateOne({_id:id},{$set:updatedUser});
        return res.status(200).json(updatedData);
    } catch (error) {
        next(error);
    }
}

const deletecontactById=async(req,res)=>{
    try {
        const id=req.params.id;
    await Contact.deleteOne({_id:id});
    console.log(id)
    res.status(200).json({msg:"contact deleted successfully"})
    } catch (error) {
        next(error)
    }
}
module.exports={getallUsers,getallContacts,deleteUserById,getUserById,updateUserById,deletecontactById};
