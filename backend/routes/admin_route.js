const express=require("express")
const router=express.Router()
const admincontroller=require("../controllers/admin_controller")
// const {getallUsers}=require("../controllers/admin_controller")
// const {getallContacts}=require("../controllers/admin_controller")
const authmiddleware=require("../middlewares/auth_middleware")       //this is authmiddleware is same as we used for automatic contact data filling basically it check that user logged in has token or not to verify user is loged in or not
const adminmiddleware=require("../middlewares/admin-middleware")   //this middleware used to cheack that loged in user is admin or not becouse admin site must be accessible by admin only
// console.log(admincontroller.getallUsers)
router.route("/users").get(authmiddleware,adminmiddleware,admincontroller.getallUsers)     //we use authmiddleware for access this route for only loged in user   and adminmiddleware is to check login user is admin or not             //this is for get all users who had sign up to the admin
router.route("/contacts").get(authmiddleware,adminmiddleware,admincontroller.getallContacts)     //we use authmiddleware for access this route for only loged in user        //this is for get all contacts who had sign up to the admin
router.route("/users/:id").get(authmiddleware,adminmiddleware,admincontroller.getUserById);
router.route("/users/:id/edit").patch(authmiddleware,adminmiddleware,admincontroller.updateUserById);
router.route("/users/delete/:id").delete(authmiddleware,adminmiddleware,admincontroller.deleteUserById);   // we are given :id in route so that we can pass id of user in url and we get it by req.params.id and then we can easily delete //we give middleware also becouse for perform delete operation user must loged in and that user must be admin so therefore we pass authmiddleware and adminmiddleware
router.route("/contacts/delete/:id").delete(authmiddleware,adminmiddleware,admincontroller.deletecontactById);   // we are given :id in route so that we can pass id of user in url and we get it by req.params.id and then we can easily delete //we give middleware also becouse for perform delete operation user must loged in and that user must be admin so therefore we pass authmiddleware and adminmiddleware
module.exports=router
