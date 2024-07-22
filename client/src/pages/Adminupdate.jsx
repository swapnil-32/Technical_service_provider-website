import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';    //along with importing toast in above line we also need to import this css otherwise toast is visible anywhere with improper styling
import { useParams } from "react-router-dom";
export const Adminupdate=()=>{
    const [updateddata,setupdateddata]=useState({
        username:"",
        email:"",
        phone:""
        // username:user.username,
        // email:user.email,
        // message:""
    })
    const params=useParams();
    console.log("params single user:",params);
    const {authorizationtoken}=useAuth();
    const getsingleUser=async()=>{
        try {
            const response=await fetch(`http://localhost:3000/api/admin/users/${params.id}`,
            {method:"GET",
            headers:{
                Authorization:authorizationtoken
            },
        }
            );
            const data=await response.json();
            console.log("users single data ",data);
            setupdateddata(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getsingleUser();
    },[]);

    const handlechange=(e)=>{
        console.log(e.target);
        let feildname=e.target.name;      //here name can anything like username,email,etc see below  
        let feildval=e.target.value;      //here val can anything that we are typing
        setupdateddata({
            ...updateddata,          //here we access previous data also by spread operator(...) by this when we enter username and we are going to enter the email or anything then our username will remain store
            [feildname]:feildval        //here we use name with [] becouse feildname is dynamic i.e wharever input we changing that feild name is comming here. so here we make it dynamic by using inside []
        })

        // setcontact((prev)=>({
        //     ...prev,                        //this also work(i.e with callback function)
        //     [feildname]:feildval 
        // }))
    }
    
    const handlesubmit=async(e)=>{
        e.preventDefault();        //by this when we submit then page will not refreshed
        // alert(e);
        try {
             const response = await fetch(`http://localhost:3000/api/admin/users/${params.id}/edit`, {    //here in url itself we pass id sothat we can get it by req.params.id and in backend we can delete it easily
        method: "PATCH",
        headers: {
            "Content-Type":"application/json",      //we need to give this becouse we need to tell that we are passing body data .this passing data by below body:JSON.stringify(updateddata)
          Authorization: authorizationtoken,
        },
        body:JSON.stringify(updateddata)
      });
      if(response.ok){
      toast.success("updated successfully");
      }
      else{
        toast.error("not updated");
      }
            // if(response.ok){
            //     const res_data=await response.json();
            //     console.log(res_data);
            //     setcontact({username:"",email:"",message:""})
            //     // alert("message sent successfully")
            //     toast.success("message sent successfully")    //instead of alert we use toast
            // }
            // else{
            //     toast.error(res_data.extraDetails?res_data.extraDetails:res_data.message)   //when only tost() then it show but not feel like error
            // }
        } catch (error) {
            // alert("message not send")
            console.log(error);
        }
    }
    return <>
    <section>
        <h1>update</h1>
        <div className="contact_container">
            <div className="form_container">
                <form action="" onSubmit={handlesubmit}>
                    <div>
                        <label htmlFor="username">Username</label>
                        {/* <br /> */}
                        <input type="text" name="username" placeholder="enter the username" id="username" required autoComplete="off" value={updateddata.username} onChange={handlechange}/>
                    </div>   {/*here we must give same name(i.e username in registration schema there also username feild if there is Username then also not work) as in registration schema of our backend*/}
                    <div>
                        <label htmlFor="email">email</label>
                        {/* <br /> */}
                        <input type="text" name="email" placeholder="enter the email" id="email" required autoComplete="off" value={updateddata.email} onChange={handlechange}/>
                    </div>
                    {/* <br /> */}
                    <div>
                        <label htmlFor="phone">Mobile</label>
                        {/* <br /> */}
                        
                        <input type="phone" name="phone" placeholder="enter the phone" id="phone" required autoComplete="off" value={updateddata.phone} onChange={handlechange}/>
                    </div>
                    <div>
                    <button type="submit" className="btn">update</button>
                    </div>
                    
                </form>
            </div>
        </div>
    </section>
    </>
    
}
//  default Contact;