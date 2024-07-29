import express from 'express';
import multer from 'multer';
const upload = multer({ dest: `./images`})

import {
    getImageById,
    getGalleryImages,
    getAboutImages,
    getTentImages,
    getMansionImages,
    getContactImages,
    postImage
} from '../controllers/imagesController';

import authenticateToken from '../middleware/authMiddleware';

const router = express.Router();

router.get('/one/:id', getImageById);

router.get('/about', getAboutImages);
router.get('/tent', getTentImages);
router.get('/mansion', getMansionImages);
router.get('/gallery', getGalleryImages);
router.get('/contact', getContactImages);

router.post('/', authenticateToken, upload.single('image'), postImage);


export default router;