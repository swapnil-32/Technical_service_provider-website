// export const AdminContacts=()=>{
//     return <h1>this admin contacts</h1>
// }
import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import {toast} from "react-toastify"
// import { getallUsers } from "../../../backend/controllers/admin_controller";
import {Link} from "react-router-dom"
export const AdminContacts = () => {
  const { authorizationtoken } = useAuth();
  const [contacts, setcontacts] = useState([]);
  const getAllcontacts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/admin/contacts", {
        method: "GET",
        headers: {
          Authorization: authorizationtoken,
        },
      });
      const data = await response.json();
      console.log("users:", data);
      setcontacts(data);
    } catch (error) {
      console.log(error);
    }
  };


//   const deleteuser=async(id)=>{
//     try {
//       const response = await fetch(`http://localhost:3000/api/admin/users/delete/${id}`, {    //here in url itself we pass id sothat we can get it by req.params.id and in backend we can delete it easily
//         method: "DELETE",
//         headers: {
//           Authorization: authorizationtoken,
//         },
//       });
//       const data=await response.json();
//       console.log(`user after deleted ${data}`);
//       if(response.ok){
//         getAllUsersData()   //by this we not need to refresh the pafe to see updated list
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }


  useEffect(() => {
    getAllcontacts(); //basically here we call this getAllUsersData functions in useEffect
  }, []); //we added here array dependancies so that these functions call/run only once when page loaded first time and should not run again and again

  const deletecontact=async(id)=>{
    try {
        console.log(id);
      const response = await fetch(`http://localhost:3000/api/admin/contacts/delete/${id}`, {    //here in url itself we pass id sothat we can get it by req.params.id and in backend we can delete it easily
        method: "DELETE",
        headers: {
          Authorization: authorizationtoken,
        },
      });
    //   const data=await response.json();
    //   console.log(`user after deleted ${data}`);
      if(response.ok){
        getAllcontacts()   //by this we not need to refresh the pafe to see updated list
        toast.success("contact deleted successfully");
      }
      else{
        toast.error("not deleted")
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <section >
        <div className="container">
          <h1>contacts</h1>
        </div>
        <div className="admin-contact">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>message</th>
                {/* <th>Update</th>
                <th>Delete</th> */}
              </tr>
            </thead>
            <tbody>
              {contacts.map((currcontact, index) => {
                // return <h2 key={index}>{currUser.username}</h2>
                return (
                <tr key={index}>
                  <td>{currcontact.username}</td>
                  <td>{currcontact.email}</td>
                  <td>{currcontact.message}</td>
                  {/* <td>
                    <Link to={`/admin/users/${currcontact._id}/edit`}>Edit</Link>
                  </td> */}
                  <td><button onClick={()=>deletecontact(currcontact._id)}>Delete</button></td>
                </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};
