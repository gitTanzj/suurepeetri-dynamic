import React, { useState } from 'react'
import './TentPage.css'

import tentImage1 from '../mockData/tentImages/24_06_28_Suurepeetri telkmajutus-01.jpg'
import tentImage2 from '../mockData/tentImages/24_06_28_Suurepeetri telkmajutus-03.jpg'
import tentImage3 from '../mockData/tentImages/24_06_28_Suurepeetri telkmajutus-04.jpg'
import tentImage4 from '../mockData/tentImages/24_06_28_Suurepeetri telkmajutus-05.jpg'
import tentImage5 from '../mockData/tentImages/24_06_28_Suurepeetri telkmajutus-06.jpg'
import tentImage6 from '../mockData/tentImages/24_06_28_Suurepeetri telkmajutus-07.jpg'
import tentImage7 from '../mockData/tentImages/24_06_28_Suurepeetri telkmajutus-08.jpg'
import tentImage8 from '../mockData/tentImages/24_06_28_Suurepeetri telkmajutus-09.jpg'
import tentImage9 from '../mockData/tentImages/24_06_28_Suurepeetri telkmajutus-10.jpg'


import { pageTransitionToRight } from '../animations/pageTransitions'
import { motion } from 'framer-motion'

import { useNavigate } from 'react-router-dom'

import { ContactButton } from '../components/ContactButton'

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Thumbnails } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/plugins/thumbnails.css";

export const TentPage = () => {

  const navigate = useNavigate()

  const [open, setOpen] = useState<boolean>(false);

  const tentImages = [
    tentImage1,
    tentImage2,
    tentImage3,
    tentImage4,
    tentImage5,
    tentImage6,
    tentImage7,
    tentImage8,
    tentImage9

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
          <h2>Telk</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <ContactButton/>
        </div>
        <div className='tent-image-container'>
          <div className='tent-image' onClick={() => setOpen(true)}>
            <img src={tentImages[0]} width="300"/>
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
          tentImages.map((image) => ({
            src: image,
          }))
        }
      />
    </motion.div>
  )
}
