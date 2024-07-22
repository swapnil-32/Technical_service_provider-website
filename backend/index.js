// require('dotenv').config({ path: require('find-config')('.env') });  //for use of env file this line is required for that
require('dotenv').config()
const mongoconnect=require('./utils/db')
const express=require('express')
const cors=require("cors")
const app=express()
const errorMiddleware=require('./middlewares/error_middleware')  
// console.log(process.env)
const corsOption={
    origin:"http://localhost:5173" ,   //this is clien(frontend) running link
    methods:"GET,POST,PUT,DELETE,PATCH,HEAD ",
    credentials:true
}
app.use(cors(corsOption))   //this middleware used tosolve cors policy which come when frontend connect to backend.see front_info file for more
app.use(express.json());   //responsible for parsing the json data from requests

//available routes
app.use('/api/auth',require('./routes/auth_route'))    //if we search for localhost:3000/api/auth then it run code inside auth.js in auth_route file we define routes so to use this we need to search localhost:3000/api/auth/ and localhost:3000/api/auth/register 
app.use('/api/form',require('./routes/contact_route'))
app.use('/api/data',require('./routes/service_route'))
app.use("/api/admin",require("./routes/admin_route"))
// app.use("/api/admin",require("./routes/admin_route"))
app.use(errorMiddleware);                   //we use it in validate_middleware file
mongoconnect().then(()=>{      //in mangoconect file we used the promise so here we used the then()=>{}
app.listen(3000,()=>{
    console.log('server running on port 3000');
})
});
