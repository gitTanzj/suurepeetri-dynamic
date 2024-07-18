import React, { useEffect, useState} from 'react'
import axios from 'axios';
import './ContactPage.css'
import contactImage from '../mockData/contact-backdrop.jpg'
import { useNavigate } from 'react-router-dom'

import { motion } from 'framer-motion'
import { pageTransitionToRight } from '../animations/pageTransitions'

import { Logo } from '../components/Logo'

interface ContactContent {
  EMAIL?: string,
  PHONE_NUMBER?: string,
  ADDRESS?: string
}

export const ContactPage = () => {

    const [contactTitle, setContactTitle] = useState<string>("");
    const [contactContent, setContactContent] = useState<ContactContent>({});

  useEffect(() => {
    axios.get('http://localhost:4000/api/contents/contact')
    .then(res => {
        const contents = res.data[0]
        setContactTitle(contents.TITLE)
        setContactContent({
          EMAIL: contents.EMAIL ? contents.EMAIL : "",
          PHONE_NUMBER: contents.PHONE_NUMBER ? contents.PHONE_NUMBER : "",
          ADDRESS: contents.ADDRESS ? contents.ADDRESS : ""
        })
    })
    .catch(err => console.log(err))
  }, [])

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

        <Logo/>

        <div className='contact-content'>
          <div className='contact-info-container'>
            <div className='contact-info'>
              <h1>{contactTitle}</h1>
              {contactContent && Object.entries(contactContent).map(([key, val]) => (
                <h3 key={key}>{val}</h3>
              ))}
            </div>
          </div>
          <div className='contact-image'>
            <img src={contactImage}/>
          </div>
        </div>
    </motion.div>
  )
}
