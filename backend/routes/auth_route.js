const express=require('express')
const validate_schema=require('../validators/auth_validator')
const validate=require('../middlewares/validate_middleware')
const authmiddleware=require("../middlewares/auth_middleware");   //for cheack that logged in user have jwt token or not
// const router=express.Router()
// const User=require('../models/User')
// const{query,validationResult}=require("express-validator")       //we installed the npm install express-validator for validation
// // const app=express()
// router.post('/',[query('name').isLength({min:3}),query('email').isEmail(),query('password').isLength({min:5})],(req,res)=>{
//     const result = validationResult(req);
//     if (result.isEmpty()) {
//       return res.send(`Hello, ${req.query.person}!`);
//     }
//     res.send({ errors: result.array() });
//     const user=User(req.body);
//     user.save()
// })

const router=express.Router()
// const {home,register}=require('../controllers/auth_controller')    //we can add all controler like {home,register,login}
const authcontroller=require('../controllers/auth_controller')   //here instead of writing all inside {}we use one word (i.e authcontroller)
// router.get('/',home);
router.get('/',authcontroller.home);

// router.get('/register',register);
// router.post('/register',authcontroller.register);    //in postman go at headers select key=Content-type and value as application/json it bcically means we are storing  data in json format then click on body and in that click on raw and select json for data entry and then write data in json format
// router.post('/register',validate(signupschema),authcontroller.register);   // this is not working //here we apply middleware(validate) 
router.route('/register').post(validate(validate_schema.signupschema),authcontroller.register)
// router.route('/login').post(validate(signinschema),authcontroller.register)
router.post('/login',validate(validate_schema.signinschema),authcontroller.login);
// router.get("/user",authmiddleware,authcontroller.user)     //authmiddleware is middleware
router.route('/user').get(authmiddleware,authcontroller.user) //authmiddleware is middleware  above line not work if we want to use middleware
module.exports=router;
