import React from 'react';
import { Header } from '../components/Header';
import { NavBar } from '../components/NavBar';
import './HomePage.css';

import { motion, AnimatePresence } from 'framer-motion';
import { pageTransitionToLeft } from '../animations/pageTransitions';

export const HomePage = () => {
  

  return (
      <motion.div
        key='home'
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransitionToLeft}
        className='homepage-container'
      >
          <Header/>
          <NavBar/>
      </motion.div>
  );
}





