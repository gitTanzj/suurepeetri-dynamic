import React, { useState } from 'react'
import './Gallery.css'


import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Thumbnails } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import image1 from '../mockData/tentImages/24_06_28_Suurepeetri telkmajutus-01.jpg'
import image2 from '../mockData/tentImages/24_06_28_Suurepeetri telkmajutus-03.jpg'
import image3 from '../mockData/tentImages/24_06_28_Suurepeetri telkmajutus-04.jpg'
import image4 from '../mockData/tentImages/24_06_28_Suurepeetri telkmajutus-05.jpg'
import image5 from '../mockData/tentImages/24_06_28_Suurepeetri telkmajutus-06.jpg'
import image6 from '../mockData/tentImages/24_06_28_Suurepeetri telkmajutus-07.jpg'
import image7 from '../mockData/tentImages/24_06_28_Suurepeetri telkmajutus-08.jpg'
import image8 from '../mockData/tentImages/24_06_28_Suurepeetri telkmajutus-09.jpg'
import image9 from '../mockData/tentImages/24_06_28_Suurepeetri telkmajutus-10.jpg'
import image10 from '../mockData/mansionImages/24_06_28_Suurepeetri telkmajutus-20.jpg'
import image11 from '../mockData/mansionImages/24_06_28_Suurepeetri telkmajutus-21.jpg'
import image12 from '../mockData/mansionImages/24_06_28_Suurepeetri telkmajutus-22.jpg'

export const Gallery = () => {

  const [open, setOpen] = useState<boolean>(false)

  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
    image11,
    image12
  ]

  return (
      <>
        <div className='images-container'>
          {images.map((image, index) => (
            <img key={index} src={image} alt={`Pilt ${index}`} onClick={() => setOpen(true)}/>
          ))}
        </div>
        <Lightbox
          plugins={[Thumbnails]}
          open={open}
          close={() => setOpen(false)}
          slides={images.map((image) => ({
            src: image
          }))}
        />
      </>
  )
}
