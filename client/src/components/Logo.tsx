import React from 'react'
import './Logo.css'

import logo from '../../public/assets/suurepeetriLogo.svg'

import { Link } from 'react-router-dom'

export const Logo = () => {
  return (
    <div className="logo">
        <Link to='/'>
            <span>
                <img src={logo}/>
            </span>
        </Link>
    </div>
  )
}
