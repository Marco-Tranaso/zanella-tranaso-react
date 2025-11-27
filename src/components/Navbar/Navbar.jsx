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
          <Link to='/tv-shows'>
            <li>Serie</li>
          </Link>
          <Link to='/movies'>
            <li>Film</li>
          </Link>
          <Link to='/new-popular'>
            <li>New & Popular</li>
          </Link>
          <Link to="/favorites">
            <li>Il mio Netflix</li>
          </Link>
        </ul>
      </div>
      <div className="navbar-right">
        <SearchBar />
        <p>Bambini</p>
        <img src={bell_icon} alt="bell icon" className='icons' />

        <div className="navbar-profile">
          <img src={profile_img} alt="profile image" className='profile' />
          <img src={caret_icon} alt="caret icon" />
          <div className="dropdown">
            <Link to='/login'>
              <p>Esci da Netflix</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
