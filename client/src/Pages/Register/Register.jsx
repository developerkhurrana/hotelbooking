import {useState, useEffect} from 'react'
import './Register.css'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../Redux/Actions/userAction'
import { useNavigate } from 'react-router-dom'

const Register = (e) => {
  const [credentials, setCredentials] = useState('')
  const handleChange = (e) =>{
    setCredentials(prev =>({
      ...prev, [e.target.name] : e.target.value
    }))
  }
  const err = useSelector(state=>state.user.error)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleClick = (e) =>{
    e.preventDefault()
    dispatch(register(credentials))
    if(!err){
      // navigate('/login')
      console.log('redirect success')
    }
  }
  console.log(err)
  return (
    <div>
        <div className="register">
            <div className="reg-container">
                <h1>Register</h1>
                <input type="text" name='username' className="user-inp" onChange={handleChange} placeholder='Enter Your Username'/>
                <input type="email" name='email' className="user-email" onChange={handleChange} placeholder='Enter Email'/>
                <input type="password" name='password' className="user-pass" onChange={handleChange} placeholder='Enter New Password'/>
                <input type="password" name='confirm_password' className="user-pass" onChange={handleChange} placeholder='Confirm Password'/>
                <button className="reg-butt" onClick={handleClick}>Register</button>
                <span>{err && err}</span>
            </div>
        </div>
    </div>
  )
}

export default Register