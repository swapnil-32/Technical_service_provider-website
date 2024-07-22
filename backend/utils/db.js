const mongoose=require("mongoose")
// const url='mongodb://127.0.0.1:27017/my_app'    // mongodb://127.0.0.1:27017/ this url is copied from (open cmd then type mongosh and tap enter this will show url we copy till as shown in this line)

// const url='mongodb+srv://swapnil:swap@cluster0.7u3ppis.mongodb.net/mern_admin?retryWrites=true&w=majority'   //this link is from mongo atlas click on database then on connect then on drivers and copy that link in that link put our pass in place of <password> and mongodb.net/ put database name
//in above line password is directly visible so we use dotenv for security we create .env file in backend folder we also install Dotenv Official +Vault extension
//so we store above url in .env file

// const url=process.env.MONGODB_URI;    //not working
// const url='mongodb+srv://swapnil:swap@cluster0.f3j5m8s.mongodb.net/mern_admin?retryWrites=true&w=majority'

// const url='mongodb+srv://swapnil:swap@cluster0.7u3ppis.mongodb.net/mern_admin?retryWrites=true&w=majority';   //when env not work use this
const url=process.env.MONGODB_URI;
const mongoconnect=async()=>{
    try{
        await mongoose.connect(url)
    }
    catch(error){
        // console.error("connection failed");
        console.log(error);
    }
}
module.exports=mongoconnect;