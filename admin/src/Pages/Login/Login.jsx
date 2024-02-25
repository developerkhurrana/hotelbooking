import axios from 'axios'
import { useState, useEffect } from 'react'
import "./Login.css"
import { login } from '../../Redux/Actions/userAction'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import blob from '../../assets/sport.png'
import blob2 from '../../assets/blood.png'
import blob3 from '../../assets/bloods.png'
import blob4 from '../../assets/sports.png'


const Login = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    })

    const handleChange = (e) =>{
      setCredentials(prev=>({
        ...prev, [e.target.name] : e.target.value
      }))
    }
    console.log(credentials,"creden")
    const dispatch = useDispatch()
    const user =  useSelector(state=>state.user.currentUser)
    const err = useSelector(state=> state.user.error)
    const loading = useSelector(state=> state.user.loading)
    console.log(user,"user")
    
    const navigate = useNavigate()

    const handleClick = (e) =>{
      e.preventDefault()
      dispatch(login(credentials))
    }

    useEffect(()=>{
      if(user!==null && Object.keys(user).length!==0){
        navigate('/')
      }
    },[user]);

  return (
    <div className='login'>
      <img src={blob3} className='down' alt="" />
      <img src={blob4} className='up' alt="" />
      <div className="login-container">
      <img src={blob2} className='left' alt="" />
      <img src={blob} className='right' alt="" />
        <h1>Login</h1>
        <input type="text" name='username' id='username' placeholder='Enter Username' onChange={handleChange} className="l-input"/>
        {/* <div className='password-box'> */}
        <input type= "password" name='password' id='password' placeholder='Enter Password' onChange={handleChange} className="l-input"/>
          {/* <i className={showPass ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash'} onClick={passwordHandler} name="eye"></i> */}
        {/* </div> */}
        <button disabled={loading} onClick={handleClick} className="l-button">Login</button>
        <span>{err && err }</span>
      </div>
    </div>
  )
}

export default Login


