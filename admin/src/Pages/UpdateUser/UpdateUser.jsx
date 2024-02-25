import "./UpdateUser.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"
import useFetch from "../../hooks/useFetch";

const UpdateUser = ({ title }) => {

  const  {id} = useParams()
  const { data, loading, error } = useFetch(`${import.meta.env.VITE_BASE_URL}/user/get-single-user/${id}`);
    const singleUser= data.data
    console.log(singleUser)
  const [userData, setUserData] = useState({});

  const handleChange = (e) =>{
    setUserData(prev=>({
      ...prev, [e.target.name]:e.target.value
    }))
  }
  
  const handleClick =  (e) =>{
    e.preventDefault()

    const updateData = async () => {
      try{
        await axios.put(`${import.meta.env.VITE_BASE_URL}/user/update-user/${id}`,userData)
      } catch(error){
          console.error(error)
      }
    }
    updateData()

  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <div className="top">
          <h1>{title}</h1>
        </div>
          <div className="details">
          <h2>User Details:</h2>
          <p><span className="field">Username:</span> {singleUser?.username}</p> 
          <p><span className="field">Email:</span>  {singleUser?.email}</p> 
          <p><span className="field">Admin:</span>  {String(singleUser?.isAdmin)}</p> 
          </div>
        <div className="bottom">
          <div className="right">
            <form>
              <label>Username</label>
              <input type="text" name="username" onChange={handleChange} defaultValue={singleUser?.username} />
              <label>Email</label>
              <input type="email" name="email" onChange={handleChange} defaultValue={singleUser?.email} />

              <button onClick={handleClick}>Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
