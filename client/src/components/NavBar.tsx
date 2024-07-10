import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavBar.css'

export const NavBar = () => {
  return (
    <div className='navbar-container'>
        <div className='navbar'>
            <NavLink to='/meist'><h3>Meist</h3></NavLink>
            <NavLink to='/majutus'><h3>Majutus</h3></NavLink>
            <NavLink to='/galerii'><h3>Galerii</h3></NavLink>
            <NavLink to='/kontakt'><h3>Kontakt</h3></NavLink>
        </div>
    </div>
  )
}
