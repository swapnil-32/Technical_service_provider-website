import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../store/auth"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';    //along with importing toast in above line we also need to import this css otherwise toast is visible anywhere with improper styling
export const Login=()=>{
const [user,setuser]=useState({
    email:"",
    password:""
})
const navigate=useNavigate();
const {storetokenInLs}=useAuth();

const handlechange=(e)=>{
    console.log(e.target);
    let feildname=e.target.name;      //here name can anything like username,email,etc see below  
    let feildval=e.target.value;      //here val can anything that we are typing
    setuser({
        ...user,          //here we access previous data also by spread operator(...) by this when we enter username and we are going to enter the email or anything then our username will remain store
        [feildname]:feildval        //here we use name with [] becouse feildname is dynamic i.e wharever input we changing that feild name is comming here. so here we make it dynamic by using inside []
    })

     // setcontact((prev)=>({
        //     ...prev,                        //this also work(i.e with callback function)
        //     [feildname]:feildval 
        // }))
}

const handlesubmit=async (e)=>{
    e.preventDefault();        //by this when we submit then page will not refreshed
    try {
        
        const response=await fetch("http://localhost:3000/api/auth/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"                                   //we give details like method(post),header,and data in the body i.e similar in postman
            },
            body:JSON.stringify(user)
        })
        console.log(response)
        const res_data=await response.json();
            console.log("response from server",res_data.extraDetails);
        if(response.ok){
            // const res_data=await response.json();
            // console.log("response from server",res_data);

            
            // localStorage.setItem("token",res_data.token);     //by this line token's value is stored on local storage 
            storetokenInLs(res_data.token)       // but instead of writing above line everytime we create context api see the auth.jsx file in the store folder

            // alert("login successful");
            toast.success("login successfully")    //instead of alert we use toast
            setuser({email:"",password:""});
            navigate("/")
        }
        else{
            // alert("invalid credintial");
            // alert(res_data.extraDetails?res_data.extraDetails:res_data.message)
            toast.error(res_data.extraDetails?res_data.extraDetails:res_data.message)   //when only tost() then it show but not feel like error
            console.log("invalid credintial");
        }
    } catch (error) {
        console.log(error);
    }
    
}
    return <>
    <section>
        <div className="login_container">
            <div className="img_container">
                <img src="/images/registration.png" alt="thanks for login" height="400" width="400" />
            </div>
            <div className="form_container">
                <h1 className="formheading">login form</h1>
                <br />
                <form action="" onSubmit={handlesubmit}>
                    <div>
                        <label htmlFor="email">email</label>
                        {/* <br /> */}
                        <input type="text" name="email" placeholder="enter the email" id="email" required autoComplete="off" value={user.email} onChange={handlechange}/>
                    </div>    {/*here we must give same name(i.e email in login schema there also email feild if there is Email then also not work) as in login schema of our backend*/}
                    <div>
                        <label htmlFor="password">password</label>
                        {/* <br /> */}
                        <input type="password" name="password" placeholder="enter the password" id="password" required autoComplete="off" value={user.password} onChange={handlechange}/>
                    </div>
                    {/* <br /> */}
                    <div>
                    <button type="submit" className="btn">contact</button>
                    </div>
                </form>
            </div>
        </div>
    </section>
    </>

}
// export default Login;