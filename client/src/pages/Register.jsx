import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../store/auth"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';    //along with importing toast in above line we also need to import this css otherwise toast is visible anywhere with improper styling
export const Register=()=>{
    const[user,setuser]=useState(
        {
            username:"",
            email:"",
            phone:"",
            password:""     
        }
    )
    const navigate=useNavigate()     //we need to declare this in this Register function when we declare it above export below import then it give error
    const {storetokenInLs}=useAuth();

    const handlechange=(e)=>{
        console.log(e.target.value);
        let feildname=e.target.name;   //here name can anything like username,email,etc see below  
        let feildval=e.target.value;   //here val can anything that we are typing
        setuser(
            {
                ...user,          //here we access previous data also by spread operator(...) by this when we enter username and we are going to enter the email or anything then our username will remain store
                [feildname]:feildval        //here we use name with [] becouse feildname is dynamic i.e wharever input we changing that feild name is comming here. so here we make it dynamic by using inside []
            }
        )

         // setcontact((prev)=>({
        //     ...prev,                        //this also work(i.e with callback function)
        //     [feildname]:feildval 
        // }))
    }

    // in below function we connect frontend with backend
    const handlesubmit=async (e)=>{     //fetch method returns the promise so we need to use .then or we can use async await
        e.preventDefault();   //by this when we submit then page will not refreshed
        console.log(user)
        try {
            const response=await fetch("http://localhost:3000/api/auth/register",{       //this link is same we used in postman for register
                method:"POST",
                headers:{
                    "Content-Type":"application/json"                                   //we give details like method(post),header,and data in the body i.e similar in postman
                },
                body:JSON.stringify(user)
            })
            const res_data=await response.json();          //if there is any error comes from error middleware then error will come in response otherwise if successfull registration then registration data comes from response
            console.log("response from server",res_data.extraDetails);

            if(response.ok){          //if data is successfully submitted then we make form entry empty
                // const res_data=await response.json();
                // console.log("response from server",res_data);

             // localStorage.setItem("token",res_data.token);     //by this line token's value is stored on local storage 
                storetokenInLs(res_data.token)       // but instead of writing above line everytime we create context api see the auth.jsx file in the store folder

                setuser({username:"",email:"",phone:"",password:""})
                toast.success("registration successfully")    //instead of alert we use toast
                navigate("/")     //if successfully register then user automatically go to the login
            }
            else{
                // alert(res_data.extraDetails?res_data.extraDetails:res_data.message)    //this condition becouse when extradetails are not available then error message should display  like if email already exist this message comming from backend. remember in backend also at time of sending message give parameter as message not give only msg becouse here message and message parameter need to be match
                toast.error(res_data.extraDetails?res_data.extraDetails:res_data.message)   //when only tost() then it show but not feel like error
            }
            console.log(response);          //even if it showing responce in browser console but data is not added in database this is becouse in backend we kept restriction like email must in email  format,mobile number must be 10 digits,etc. so give correct input
        } catch (error) {
            console.log(error);
        }
        
    }
    return <>
    <section>
        <div className="registration_container">
            <div className="img_container">
                <img src="/images/registration.png" alt="thanks for registration" height="400" width="400" />
            </div>
            <div className="form_container">
                <h1 className="formheading">registration form</h1>
                <br />
                <form action="" onSubmit={handlesubmit}>
                    <div>
                        <label htmlFor="username">Username</label>
                        {/* <br /> */}
                        <input type="text" name="username" placeholder="enter the username" id="username" required autoComplete="off" value={user.username} onChange={handlechange}/>
                    </div>   {/*here we must give same name(i.e username in registration schema there also username feild if there is Username then also not work) as in registration schema of our backend*/}
                    <div>
                        <label htmlFor="email">email</label>
                        {/* <br /> */}
                        
                        <input type="text" name="email" placeholder="enter the email" id="email" required autoComplete="off" value={user.email} onChange={handlechange}/>
                    </div>
                    <div>
                        <label htmlFor="phone">phone</label>
                        {/* <br /> */}
                        
                        <input type="number" name="phone" placeholder="enter the phone" id="phone" required autoComplete="off" value={user.phone} onChange={handlechange}/>
                    </div>
                    <div>
                        <label htmlFor="password">password</label>
                        {/* <br /> */}
                        
                        <input type="password" name="password" placeholder="enter the password" id="password" required autoComplete="off" value={user.password} onChange={handlechange}/>
                    </div>
                    {/* <br /> */}
                    <div>
                    <button type="submit" className="btn">Register Now</button>
                    </div>
                </form>
            </div>
        </div>
    </section>
    </>
    
}
// export default Register;