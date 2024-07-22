const express=require("express")
const router=express.Router()
const services=require("../controllers/services")
router.get('/service',services)
module.exports=router;