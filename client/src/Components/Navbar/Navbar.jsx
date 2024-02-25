import React from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userLogOut } from '../../Redux/Reducers/userReducer'

const Navbar = () => {

  let user = useSelector(state=>state.user.currentUser)
  // const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate()
  const dispatch =  useDispatch()
  console.log(!user);

  return (
    <div className='navbar'>
        <div className='nav-container'>
          <Link to={'/'} style={{textDecoration:'none', color:'inherit'}}>
            <span className='logo'>RiverSun</span>
          </Link>
            <div className='nav-items'>
                { !user ? <> <button className='nav-button'>Register</button>
                <Link to={'/login'} style={{textDecoration:'none', color:'inherit'}}>
                  <button className='nav-button'>Login</button> 
                </Link></> :
                <button onClick={()=>dispatch(userLogOut())} className='nav-button'>Log Out</button>}
            </div>
        </div>
    </div>
  )
}

export default Navbar