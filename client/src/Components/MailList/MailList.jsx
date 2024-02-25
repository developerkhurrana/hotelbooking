import React from 'react'
import './MailList.css'

const MailList = () => {
  return (
    <div className='mail'>
        <h1 className="mail-title">Save Time, Same Money</h1>
        <span className='mail-desc'>Sign up and we'll send the best deals to you</span>
        <div className="mail-input-container">
            <input type="text" placeholder='Your Email'/>
            <button>Subscribe</button>
        </div>
    </div>
  )
}

export default MailList