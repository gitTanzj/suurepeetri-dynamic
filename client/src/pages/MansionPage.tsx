import React, { useState, useEffect } from 'react'
import { pageTransitionToRight } from '../animations/pageTransitions'
import { motion } from 'framer-motion'
import axios from 'axios';

import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { Thumbnails } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import { useNavigate } from 'react-router-dom'

import { ContactButton } from '../components/ContactButton'
import { Gallery } from '../components/Gallery'

export const MansionPage = () => {

  const [mansionTitle, setMansionTitle] = useState<string>("");
  const [mansionContent, setMansionContent] = useState<string>("");
  const [mansionImages, setMansionImages] = useState<string[]>([])

  useEffect(() => {
      axios.get('http://localhost:4000/api/contents/housing/2')
        .then(res => {
          const contents = res.data
          setMansionTitle(contents.title)
          setMansionContent(contents.content)
        })
        .catch(err => console.log(err))
      axios.get('http://localhost:4000/api/images/mansion')
        .then(res => {
          setMansionImages(res.data)
        })
        .catch(err => console.log(err))
  }, [])

  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate()

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
            <h2>{mansionTitle}</h2>
            <p>
                {mansionContent}
            </p>
            <ContactButton/>
          </div>
          <div className='tent-image-container'>
            <div className='tent-image' onClick={() => setOpen(true)}>
              <img src={`http://localhost:4000/images/mansion/${mansionImages[0]}`} width="300"/>
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
              src: `http://localhost:4000/images/mansion/${image}`,
            }))
          }
        />
      </motion.div>
      <motion.div
        className='external-gallery-container'
        variants={pageTransitionToRight}
        initial='initial'
        animate='animate'
        exit='exit'
      >
        <Gallery images={mansionImages} page='mansion'/>
      </motion.div>
    </>
  )
}
