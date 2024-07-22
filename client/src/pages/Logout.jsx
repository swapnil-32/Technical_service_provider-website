import { useEffect } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../store/auth"
export const Logout=()=>{
    const {LogoutUser}=useAuth();
    useEffect(()=>{
        LogoutUser();
    },[LogoutUser])        //this Logout function is defined in auth.jsx file and we imported above
    
    return <Navigate to="/login" />
     
}
