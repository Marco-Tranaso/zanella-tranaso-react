import React, { useEffect, useRef } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import bell_icon from '../../assets/bell_icon.svg'
import profile_img from '../../assets/profile_img.png'
import caret_icon from '../../assets/caret_icon.svg'
import { Link } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'

const Navbar = () => {

  const navRef = useRef();

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add('nav-dark')
      } else {
        navRef.current.classList.remove('nav-dark')
      }
    })
  }, [])

  return (
    <div ref={navRef} className='navbar'>
      <div className="navbar-left">
        <Link to='/'>
          <img src={logo} alt="Netflix Logo" />
        </Link>        
        <ul>
        <Link to='/'>
          <li>Home</li>
        </Link>
          <li>TV Shows</li>
          <Link to='/movies'>
            <li>Movies</li>
          </Link>
          <li>New & Popular</li>
          <Link to="/favorites">
            <li>My List</li>
          </Link>
          <li>Browse by Languages</li>
        </ul>
      </div>
      <div className="navbar-right">
        <SearchBar />
        <p>Children</p>
        <img src={bell_icon} alt="bell icon" className='icons' />

        <div className="navbar-profile">
          <img src={profile_img} alt="profile image" className='profile' />
          <img src={caret_icon} alt="caret icon" />
          <div className="dropdown">
            <Link to='/login'>
              <p>Sign Out</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
