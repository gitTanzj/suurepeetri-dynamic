import React, { useEffect, useState } from 'react'
import './TentPage.css'
import axios from 'axios';

import { pageTransitionToRight } from '../animations/pageTransitions'
import { motion } from 'framer-motion'

import { useNavigate } from 'react-router-dom'

import { ContactButton } from '../components/ContactButton'

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Thumbnails } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/plugins/thumbnails.css";


import { Gallery } from '../components/Gallery'

interface Image {
  id: number,
  title: string,
  url: string,
}

export const TentPage = () => {

  const [tentTitle, setTentTitle] = useState<string>("");
  const [tentContent, setTentContent] = useState<string>("");
  const [tentImages, setTentImages] = useState<Image[]>([])

  useEffect(() => {
    axios.get('http://localhost:4000/api/contents/housing/1')
      .then(res => {
        const contents = res.data
        setTentTitle(contents.title)
        setTentContent(contents.content)
      })
      .catch(err => console.log(err))
    axios.get('http://localhost:4000/api/images/tent')
      .then(res => {
        setTentImages(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  const navigate = useNavigate()
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
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
          <h2>{tentTitle}</h2>
          <p>
            {tentContent}
          </p>
          <ContactButton/>
        </div>
        <div className='tent-image-container'>
          <div className='tent-image' onClick={() => setOpen(true)}>
            { tentImages[0] && <img src={tentImages[0].url} width="300"/> }
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
            src: image.url,
          }))
        }
      />
      
    </motion.div>
    <motion.div
      className="external-gallery-container"
      variants={pageTransitionToRight}
      initial='initial'
      animate='animate'
      exit='exit'
    >
      <Gallery images={tentImages.map((image: Image) => image.url)} page='tent'/>
    </motion.div>
    </>
  )
}
