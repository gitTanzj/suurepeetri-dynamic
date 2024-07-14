import React from 'react'
import './ContactPage.css'
import contactImage from '../mockData/contact-backdrop.jpg'
import { useNavigate } from 'react-router-dom'

import { motion } from 'framer-motion'
import { pageTransitionToRight } from '../animations/pageTransitions'

export const ContactPage = () => {

  const navigate = useNavigate()
  
  return (
    <motion.div
      className="contact-container"
      variants={pageTransitionToRight}
      initial='initial'
      animate='animate'
      exit='exit'
    >
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
        <div className='nav-back' onClick={() => navigate(-1)}>
            <span className="material-symbols-outlined">
                chevron_left
            </span>
        </div>
        <div className='contact-content'>
          <div className='contact-info-container'>
            <div className='contact-info'>
              <h1>Kontakt</h1>
              <h3>test@gmail.com</h3>
              <h3>+372 1234 5678</h3>
              <h3>Aadress 1, Linn, Eesti</h3>
            </div>
          </div>
          <div className='contact-image'>
            <img src={contactImage}/>
          </div>
        </div>
    </motion.div>
  )
}
