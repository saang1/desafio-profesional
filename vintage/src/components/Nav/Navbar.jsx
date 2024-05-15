// eslint-disable-next-line no-unused-vars
import React from 'react'
import './Navbar.css'  
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <div className="navbar">
      <ul className='nav-menu'>
      {/* gotta give the vintage p the styles from the other stuff */}.
        <p>Vintage</p>
        <li><Link to="">Products</Link></li>
        <li>Contact</li>
      </ul>
      <div className="search-bar">
        <input type="search" placeholder="Search for products and more" />
      </div>
      <div className="nav-login">
        <button>Sign Up</button>
        <button>Login</button>
        

      </div>
    </div>
    

  )
}

export default Nav