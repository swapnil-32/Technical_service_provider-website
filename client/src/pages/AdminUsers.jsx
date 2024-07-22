import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
// import { getallUsers } from "../../../backend/controllers/admin_controller";
import {Link} from "react-router-dom"
export const AdminUsers = () => {
  const { authorizationtoken } = useAuth();
  const [users, setusers] = useState([]);
  const getAllUsersData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/admin/users", {
        method: "GET",
        headers: {
          Authorization: authorizationtoken,
        },
      });
      const data = await response.json();
      console.log("users:", data);
      setusers(data);
    } catch (error) {
      console.log(error);
    }
  };


  const deleteuser=async(id)=>{
    try {
      const response = await fetch(`http://localhost:3000/api/admin/users/delete/${id}`, {    //here in url itself we pass id sothat we can get it by req.params.id and in backend we can delete it easily
        method: "DELETE",
        headers: {
          Authorization: authorizationtoken,
        },
      });
      const data=await response.json();
      console.log(`user after deleted ${data}`);
      if(response.ok){
        getAllUsersData()   //by this we not need to refresh the pafe to see updated list
      }
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    getAllUsersData(); //basically here we call this getAllUsersData functions in useEffect
  }, []); //we added here array dependancies so that these functions call/run only once when page loaded first time and should not run again and again

  
  return (
    <>
      <section className="admin-user-section">
        <div className="container">
          <h1>Admin user data</h1>
        </div>
        <div className="admin-users">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((currUser, index) => {
                // return <h2 key={index}>{currUser.username}</h2>
                return (
                <tr key={index}>
                  <td>{currUser.username}</td>
                  <td>{currUser.email}</td>
                  <td>{currUser.phone}</td>
                  <td>
                    <Link to={`/admin/users/${currUser._id}/edit`}>Edit</Link>
                  </td>
                  <td><button onClick={()=>deleteuser(currUser._id)}>Delete</button></td>
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
