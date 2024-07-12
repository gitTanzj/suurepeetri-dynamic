import React from 'react'
import './ContactButton.css'

import { Link } from 'react-router-dom'

export const ContactButton = () => {
  return (
    <Link to="/kontakt">
        <div className='contact-button'>
            <div className='contact-button-content'>
                <h3>Võta Ühendust!</h3>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
                <span className="material-symbols-outlined">
                  phone_enabled
                </span>
            </div>
        </div>
    </Link>
  )
}
