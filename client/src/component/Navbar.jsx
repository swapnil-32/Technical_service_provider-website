import { NavLink } from "react-router-dom";   {/*becouse of this entire page not refreshed when we click one of the below ,navbar remain fixed only below content will change*/}
import "./Navbar.css"
import { useAuth } from "../store/auth";
export const Navbar=()=>{
    const {isLogedIn}=useAuth();
    return(
        <>
        <header>
            <div className="container">
                <div className="logo">
                    <NavLink to="">swapnilTech</NavLink>
                </div>
                <nav>
                    <ul>
                        {/* <li ><a href="/">Home</a></li>
                        <li ><a href="/about">About Us</a></li>
                        <li ><a href="/contact">Contact</a></li>    when we use this anchor tag page will refreshe so we use navlink to not load/refresh entire page
                        <li ><a href="/service">Service</a></li>
                        <li ><a href="/register">Register</a></li>
                        <li ><a href="/login">login</a></li> */}

                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/about">About Us</NavLink></li>
                        <li><NavLink to="/contact">Contact</NavLink></li>
                        <li><NavLink to="/service">Service</NavLink></li>
                        {
                        isLogedIn ? <li><NavLink to="/logout">Logout</NavLink></li>
                        : 
                        <> 
                        <li><NavLink to="/register">Register</NavLink></li>
                        <li><NavLink to="/login">login</NavLink></li>
                        </>
                        }
                        
                       
                    </ul>
                </nav>
            </div>
        </header>
        </>
    )
}