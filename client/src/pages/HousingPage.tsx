import React from 'react'
import './HousingPage.css'
import { useNavigate, Link, Outlet } from 'react-router-dom';

import tentImage from '../mockData/Telk.png'
import mansionImage from '../mockData/Uks.png'

import { motion } from 'framer-motion'
import { pageTransitionToRight } from '../animations/pageTransitions'

export const HousingPage = () => {
  const navigate = useNavigate()

  return (
    <motion.div
      className="housing-container"
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
      <h2>Palun valige sobilik majutusviis</h2>
      <div className="housing-options">

        <Link to='/majutus/telk'>
          <div className="housing-option" id='tent'>
            <img src={tentImage}/>
            <h2>Telk</h2>
          </div>
        </Link>

        <Link to='/majutus/haarber'>
          <div className="housing-option" id='mansion'>
            <img src={mansionImage}/>
            <h2>Häärber</h2>
          </div>
        </Link>

      </div>
    </motion.div>
  )
}
