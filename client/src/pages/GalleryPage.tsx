import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './GalleryPage.css'

import { Gallery } from '../components/Gallery'


import { motion } from 'framer-motion'
import { pageTransitionToRight } from '../animations/pageTransitions'


export const GalleryPage = () => {

  const navigate = useNavigate();
  return (
    <motion.div
      key='gallery'
      className='gallery-container'
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
      <Gallery/>
    </motion.div>
  )
}
