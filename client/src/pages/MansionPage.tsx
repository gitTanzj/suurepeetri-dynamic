import React, { useState } from 'react'
import { pageTransitionToRight } from '../animations/pageTransitions'
import { motion } from 'framer-motion'

import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { Thumbnails } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import mansionImage1 from '../mockData/mansionImages/24_06_28_Suurepeetri telkmajutus-20.jpg'
import mansionImage2 from '../mockData/mansionImages/24_06_28_Suurepeetri telkmajutus-21.jpg'
import mansionImage3 from '../mockData/mansionImages/24_06_28_Suurepeetri telkmajutus-22.jpg'

import { useNavigate } from 'react-router-dom'

import { ContactButton } from '../components/ContactButton'

export const MansionPage = () => {

  const [open, setOpen] = useState<boolean>(false);

  const navigate = useNavigate()

  const mansionImages = [
    mansionImage1,
    mansionImage2,
    mansionImage3
  ]
  return (
    <motion.div
      className='tent-container'
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
      <div className='tent-content'>
        <div className='tent-text'>
          <h2>Häärber</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <ContactButton/>
        </div>
        <div className='tent-image-container'>
          <div className='tent-image' onClick={() => setOpen(true)}>
            <img src={mansionImages[0]} width="300"/>
            <span className="image-arrow">
              <span className="material-symbols-outlined">
                arrow_upward
              </span>
              <p>Vaata pilte</p>
            </span>
          </div>
        </div>
      </div>
      <Lightbox
      plugins={[Thumbnails]}
        open={open}
        close={() => setOpen(false)}
        slides={
          mansionImages.map((image) => ({
            src: image,
          }))
        }
      />
    </motion.div>
  )
}
