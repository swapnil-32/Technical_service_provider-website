import { NavLink, Navigate, Outlet } from "react-router-dom"
import { FaUserAlt,FaHome,FaRegListAlt } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { useAuth } from "../../store/auth";
export const AdminLayout=()=>{
    const {user}=useAuth();
    console.log("jbbbu",user);
    const {isloading}=useAuth();
    if(isloading){      //this is necessary becouse when website render initialy then any data is undefine i.e user is undefine after few second it loads data in user so we need to wait until isloading become false and then we go below 
        return <h1>Loading ...</h1>     
    }
    if(!user.isAdmin){    //now duw to isloading controll will not come here so our data is now in user so we now check is admin condition. when there is not isloading condition initial user is remain undefine and !user.isAdmin this condition always become true
        return <Navigate to="/"/>
    }
    return <>
    <header>
        <div className="container">
            <nav>
                <ul>
                    <li><NavLink to="/admin/users"><FaUserAlt />Users</NavLink></li>
                    <li><NavLink to="/admin/contacts"><FaMessage />Contacts</NavLink></li>
                    <li><NavLink to="/service"><FaRegListAlt />Services</NavLink></li>      {/*for run this service we also need run backend*/}
                    <li><NavLink to="/"><FaHome />Home</NavLink></li>
                </ul>
            </nav>
        </div>
    </header>
     <Outlet/>            
    </>
}
