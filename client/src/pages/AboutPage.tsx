import React, { useEffect } from 'react'
import './AboutPage.css'
import { Link, useNavigate } from 'react-router-dom'
import aboutImage from '../assets/meist.jpg'

import { motion } from 'framer-motion'

import { pageTransitionToRight } from '../animations/pageTransitions'

export const AboutPage = () => {

    const navigate = useNavigate()

    console.log(aboutImage)

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
                    <h2>Meist</h2>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>
                <div className='about-image'>
                    <img src={aboutImage} alt="Pilt meist"/>
                </div>
            </div>
        </motion.div>
    )
}


