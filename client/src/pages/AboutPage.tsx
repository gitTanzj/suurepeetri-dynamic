import React, { useEffect, useState } from 'react'
import './AboutPage.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { motion } from 'framer-motion'

import { pageTransitionToRight } from '../animations/pageTransitions'

interface Image {
    id: number,
    title: string,
    url: string,
}  

export const AboutPage = () => {

    const [aboutTitle, setAboutTitle] = useState<string>("");
    const [aboutContent, setAboutContent] = useState<string>("");

    const [images, setImages] = useState<Image[]>([])

    useEffect(() => {
        axios.get('http://localhost:4000/api/contents/about')
            .then(res => {
                const contents = res.data[0]
                setAboutTitle(contents.title)
                setAboutContent(contents.content)
            })
            .catch(err => console.log(err));
        axios.get('http://localhost:4000/api/images/about')
            .then(res => {
                setImages(res.data)
            })
            .catch(err => console.log(err));
    }, [])

    const navigate = useNavigate()

    return (
        <motion.div
            key='about'
            className='about-container'
            variants={pageTransitionToRight}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
            <div className='nav-back' onClick={() => navigate(-1)}>
                <span className="material-symbols-outlined">
                    chevron_left
                </span>
            </div>
            <div className='about-content'>
                <div className='about-text'>
                    <h2>{aboutTitle}</h2>
                    <p>
                        {aboutContent}
                    </p>
                </div>
                <div className='about-image'>
                    { images[0] && <img src={images[0].url} alt={images[0].title}/>}
                </div>
            </div>
        </motion.div>
    )
}


