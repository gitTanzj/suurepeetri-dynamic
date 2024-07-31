import React, { useState } from 'react'
import './Gallery.css'


import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Thumbnails } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/plugins/thumbnails.css";


interface GalleryProps {
  images: string[],
  page: string
}

export const Gallery: React.FC<GalleryProps> = ({ images, page }) => {

  const [open, setOpen] = useState<boolean>(false)
  const [index, setIndex] = useState<number>(0)

  return (
      <>
        <div className='images-container'>
          {images.map((image, index) => (
            <img key={index} src={image} alt={`Pilt ${index}`} onClick={() => {setOpen(true); setIndex(index)}}/>
          ))}
        </div>
        <Lightbox
          plugins={[Thumbnails]}
          open={open}
          index={index}
          close={() => setOpen(false)}
          slides={images.map((image) => ({
            src: image,
          }))}
        />
      </>
  )
}
