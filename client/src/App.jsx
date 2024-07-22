import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import {Home} from "./pages/Home"
import {About} from "./pages/About"
import {Contact} from "./pages/Contact"
import {Service} from "./pages/service"
import {Register} from "./pages/Register"
import {Login} from "./pages/Login"
// import {Logout} from "./pages/Logout"
import { Logout } from "./pages/Logout";
import {Navbar} from "./component/Navbar"
import { Footer } from "./component/footer";
import {Error} from "./pages/Error"
import { AdminLayout } from "./component/layouts/Admin-Layout";
import { AdminUsers } from "./pages/AdminUsers";
import { AdminContacts } from "./pages/AdminContacts";
import { Adminupdate } from "./pages/Adminupdate";
const App=()=>{
  return (
    <>
    <BrowserRouter>
      <Navbar/>   {/*here we place navbar becouse instead of placing navbar component in every page we put here*/}
    <Routes>
         
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />}/>
      <Route path="/contact" element={<Contact />}/>
      <Route path="/service" element={<Service />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/logout" element={<Logout/>} />
      <Route path="*" element={<Error/>} />      {/*by this if user type anything in route(we get it by *) then we show error page*/}
      <Route path="/admin" element={<AdminLayout/>}>        {/*here we created nested routes i.e /admin/users and /admin/contacts*/}
        {/* <Route path="users" element={<AdminUsers/>}/>      to work this do not give path as /users only need to give as users and for proper working of nested roots we neet Outlet see the Admin-Layout.jsx file inside layout folder */}
        <Route path="users" element={<AdminUsers/>}/>
        {/* <Route path="update/:id" element={<Admin_update/>} /> */}
        <Route path="users/:id/edit" element={<Adminupdate />} /> 
        <Route path="contacts" element={<AdminContacts/>}/>
      </Route>
    </Routes>
    <Footer/>
    </BrowserRouter>
    </>
  )
}
export default App;
