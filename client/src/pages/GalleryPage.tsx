import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './GalleryPage.css'
import axios from 'axios'

import { Gallery } from '../components/Gallery'
import { Logo } from '../components/Logo'

import { motion } from 'framer-motion'
import { pageTransitionToRight } from '../animations/pageTransitions'

interface Image {
  id: number,
  title: string,
  url: string,
}

export const GalleryPage = () => {

  const [images, setImages] = useState<Image[]>([])

  useEffect(() => {
    axios.get('http://localhost:4000/api/images/gallery')
      .then(res => {
        setImages(res.data)
      })
      .catch(err => console.log(err))
  }, [])

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
      <Logo/>
      <Gallery images={images.map((image: Image) => image.url)} page='gallery'/>
    </motion.div>
  )
}
