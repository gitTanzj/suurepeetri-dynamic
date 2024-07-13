import React from 'react'
import './ContactButton.css'

import { Link } from 'react-router-dom'

export const ContactButton = () => {
  return (
    <Link to="/kontakt">
        <div className='contact-button'>
            <div className='contact-button-content'>
                <h3>Võta Ühendust!</h3>
            </div>
        </div>
    </Link>
  )
}
