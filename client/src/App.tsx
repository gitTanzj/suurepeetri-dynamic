import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'


import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { HousingPage } from './pages/HousingPage';
import { TentPage } from './pages/TentPage';
import { MansionPage } from './pages/MansionPage';
import { AboutPage } from './pages/AboutPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';


export const App = () => {

    const location = useLocation()

  return (
    <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
            <Route path='/' element={<HomePage/>} errorElement={<NotFoundPage/>}/>
            <Route path='/meist' element={<AboutPage/>}/>
            <Route path='/galerii' element={<GalleryPage/>}/>
            <Route path='/kontakt' element={<ContactPage/>}/>
            <Route path='/majutus' element={<HousingPage/>}/>
            <Route path='/majutus/telk' element={<TentPage/>}/>
            <Route path='/majutus/haarber' element={<MansionPage/>}/>
        </Routes>
    </AnimatePresence>
  )
}
