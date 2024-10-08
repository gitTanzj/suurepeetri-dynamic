import React, { useState, useEffect } from 'react'
import { pageTransitionToRight } from '../animations/pageTransitions'
import { motion } from 'framer-motion'
import axios from 'axios';

import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { Thumbnails } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import { useNavigate } from 'react-router-dom'

import { Button } from '../components/Button'
import { Gallery } from '../components/Gallery'

interface Image {
  id: number,
  title: string,
  url: string
}

export const MansionPage = () => {

  const API_URL = process.env.REACT_APP_API_URL;

  const [mansionTitle, setMansionTitle] = useState<string>("");
  const [mansionContent, setMansionContent] = useState<string>("");
  const [mansionImages, setMansionImages] = useState<Image[]>([])

  useEffect(() => {
      axios.get(`${API_URL}/api/contents/housing/2`)
        .then(res => {
          const contents = res.data
          setMansionTitle(contents.title)
          setMansionContent(contents.content)
        })
        .catch(err => console.log(err))
      axios.get(`${API_URL}/api/images/mansion`)
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
            <Button path="/kontakt" message="Võta ühendust!"/>
          </div>
          <div className='tent-image-container'>
            <div className='tent-image' onClick={() => setOpen(true)}>
              { mansionImages[0] && <img src={mansionImages[0].url} alt={mansionImages[0].title}/>}
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
              src: image.url,
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
        <Gallery images={mansionImages.map((image: Image) => image.url)} page='mansion'/>
      </motion.div>
    </>
  )
}
