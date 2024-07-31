import React from 'react'
import { Link } from 'react-router-dom'
import './NotFoundPage.css'

import { pageTransitionToRight } from '../animations/pageTransitions'
import { motion } from 'framer-motion'

import { Button } from '../components/Button'

export const NotFoundPage = () => {

  return (
    <motion.div
      className='not-found-container'
      variants={pageTransitionToRight}
      initial='initial'
      animate='animate'
      exit='exit'
    >
      <div className='not-found-text'>
        <h1>404</h1>
        <h2>Lehekülge ei leitud</h2>
        <p>Vabandame, aga lehekülge, mida otsisite ei ole olemas, või on hetkel ligipääsetamatu.</p>
        <Button path="/" message="Tagasi kodulehele"/>
      </div>
    </motion.div>
  )
}


