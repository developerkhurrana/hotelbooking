import "./New.scss";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../Redux/Actions/userAction";

const New = ({ inputs, title }) => {
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch()
  const handleChange = (e) =>{
    setUserData(prev=>({
      ...prev, [e.target.name]:e.target.value
    }))
  }
  
  const handleClick = (e) =>{
    e.preventDefault()
    dispatch(register(userData))
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input onChange={handleChange} type={input.type} placeholder={input.placeholder} name={input.name}/>
                </div>
              ))}
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
