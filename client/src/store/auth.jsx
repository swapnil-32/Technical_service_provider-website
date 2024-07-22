import { createContext,useContext, useEffect, useState } from "react";
import {toast} from "react-toastify"
export const AuthContext=createContext();       //1st part of context api i.e context creation
export const AuthProvider=({children})=>{       //this is 2nd part of context api
    const [token,setToken]=useState(localStorage.getItem("token"));     //useful for logout functionality
    const [user,setuser]=useState("");
    const[isloading,setisloading]=useState(true);    //this used in admin-Layout file //this state isrequired becouse when initialy page load then sometime data is comming undefine so we need wait till it load so for that we used this
    const [services,setservices]=useState("")   //to store service data of database
    const authorizationtoken=`Bearer ${token}`;  //becouse need this in other pages also so we pass this variable from this file so anyone acan access becouse this file is context api

    const storetokenInLs=(servertoken)=>{
        setToken(servertoken);
        return localStorage.setItem("token",servertoken);    //so by this we make this line reusable 
    }

    let isLogedIn=!!token;  //used for logout functionality i.e we want to see either logout button or register and  login button
    console.log(isLogedIn);
    const LogoutUser=()=>{       //this is logout functionality this is also we provide in this context api
        setToken("");
        return localStorage.removeItem("token");
    }

//jwt authentication-to get data of currently loged in user    
const userAuthentication=async()=>{           //here it act like middleware so on any pafe if we need loge in user data then we can get it only we need to import useAuth see below function useAuth and also front_end_info file to see that how useAuth works
    try {
        setisloading(true);   //initialy we set it as loading=true becaouse after fetching our actual data will come so after successfully fetching we seat isloading=false see in if condition
       const response=await fetch("http://localhost:3000/api/auth/user",{
        method:"GET",
        headers:{
            Authorization:authorizationtoken
        }
       })
       if(response.ok){
        const data=await response.json();
        console.log("user data",data.userdata);
        setuser(data.userdata);
        setisloading(false);
       } 
       else{
        console.log("error in fetching user data");
        setisloading(false)     //even if data is not fetched correctly we set it false becouse our loading will be done
       }
    } catch (error) {
        // toast.error("unauthoised access")
        console.log("error in fetching data");
    }
}

//to fetch user data from database   
const getservices=async()=>{                  //we can also fetch service data in service page also but by declaring here we can use this data in any page
    try {
        const response=await fetch("http://localhost:3000/api/data/service",{
        method:'GET'  
            })
        if(response.ok){
            const data=await response.json();
            setservices(data.msg)
            console.log(data.msg)
        }
    
    } catch (error) {
        console.log(`service fronend error:${error}`);
    }

}
useEffect(()=>{
    getservices();                    //these getsservices and userAuthentication are middlewarea function and execute everytime when page is loaded 
    userAuthentication()              //basically here we call these functions in useEffect
},[])                                //we added here array dependancies so that these functions call/run only once when page loaded first time and should not run again and again 


// useEffect(()=>{
//     getservices()
// },[])

    return <AuthContext.Provider value={{ isLogedIn,storetokenInLs,LogoutUser,user,services,authorizationtoken,isloading  }} >      
        {children}
    </AuthContext.Provider>
}

export const useAuth=()=>{             //this is third part of context api i.e consumer //this useAuth function now contain value provided by Authprovoder
    // return useContext(AuthContext);       //this also work but many time we not wrap authprovider in main.jsx (main) file so below line will tellus that
    const authContextValue=useContext(AuthContext);
    if(!authContextValue){
        throw new Error("useauth used outside of provider");
    }
    return authContextValue;
}
//we wrap the main app by this provider so that any component those want data they can get by this context api. see the main.jsx file