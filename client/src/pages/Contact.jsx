import { useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';    //along with importing toast in above line we also need to import this css otherwise toast is visible anywhere with improper styling
export const Contact=()=>{
    const [contact,setcontact]=useState({
        username:"",
        email:"",
        message:""
        // username:user.username,
        // email:user.email,
        // message:""
    })
// console.log(contact)
    const [userdata,setuserdata]=useState(true);
    const {user}=useAuth();
    if(userdata && user){            //when initialy page load then usedata is always true 
        setcontact({
            username:user.username,             
            email:user.email,                  //by this we are filling/giving the default loged in user details
            message:""
        })
        setuserdata(false);
    }

    const handlechange=(e)=>{
        console.log(e.target);
        let feildname=e.target.name;      //here name can anything like username,email,etc see below  
        let feildval=e.target.value;      //here val can anything that we are typing
        setcontact({
            ...contact,          //here we access previous data also by spread operator(...) by this when we enter username and we are going to enter the email or anything then our username will remain store
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
            const response=await fetch('http://localhost:3000/api/form/contact',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(contact)          //we convert object into json
            })
            if(response.ok){
                const res_data=await response.json();
                console.log(res_data);
                setcontact({username:"",email:"",message:""})
                // alert("message sent successfully")
                toast.success("message sent successfully")    //instead of alert we use toast
            }
            else{
                toast.error(res_data.extraDetails?res_data.extraDetails:res_data.message)   //when only tost() then it show but not feel like error
            }
        } catch (error) {
            alert("message not send")
            console.log(error);
        }
    }
    return <>
    <section>
        <h1>Contact us</h1>
        <div className="contact_container">
            <div className="img_container">
                <img src="/images/contact.jpg" alt="contact us" height="400" width="400" />
            </div>
            <div className="form_container">
                <form action="" onSubmit={handlesubmit}>
                    <div>
                        <label htmlFor="username">Username</label>
                        {/* <br /> */}
                        <input type="text" name="username" placeholder="enter the username" id="username" required autoComplete="off" value={contact.username} onChange={handlechange}/>
                    </div>   {/*here we must give same name(i.e username in registration schema there also username feild if there is Username then also not work) as in registration schema of our backend*/}
                    <div>
                        <label htmlFor="email">email</label>
                        {/* <br /> */}
                        <input type="text" name="email" placeholder="enter the email" id="email" required autoComplete="off" value={contact.email} onChange={handlechange}/>
                    </div>
                    {/* <br /> */}
                    <div>
                    <label htmlFor="message">message</label>
                    {/* <br /> */}
                    <textarea name="message" id="message" cols="30" rows="7" required autoComplete="off" value={contact.message} onChange={handlechange}></textarea>
                    </div>
                    <div>
                    <button type="submit" className="btn">contact</button>
                    </div>
                    
                </form>
            </div>
        </div>
        <section>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.5316773668956!2d73.88170737496137!3d18.45956098262223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2eaf4662547c9%3A0xd96690b0786458f5!2sVIIT%20-%20Computer%20Science%20Department!5e0!3m2!1sen!2sin!4v1705835303172!5m2!1sen!2sin" width="100%" height="450"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        {/* this above html we can get by googke map search location you want then click share then after click on share go embeded map section there we get above html.in that style property is there rempve ot it will not work and other properties(width,height,etc) you can adjust */}
        </section>
    </section>
    </>
    
}
//  default Contact;