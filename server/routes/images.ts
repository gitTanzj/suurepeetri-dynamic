import express from 'express';
import {
    getGalleryImages,
    getAboutImages,
    getTentImages,
    getMansionImages,
    getContactImages
} from '../controllers/imagesController';

const router = express.Router();

router.get('/about', getAboutImages);
router.get('/tent', getTentImages);
router.get('/mansion', getMansionImages);
router.get('/gallery', getGalleryImages);
router.get('/contact', getContactImages);


export default router;