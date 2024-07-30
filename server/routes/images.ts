import express from 'express';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage });

import {
    getImageById,
    getGalleryImages,
    getAboutImages,
    getTentImages,
    getMansionImages,
    getContactImages,
    
    postImage,
    modifyImage,
    deleteImage
} from '../controllers/imagesController';

import authenticateToken from '../middleware/authMiddleware';

const router = express.Router();

router.get('/one/:id', getImageById);

router.get('/about', getAboutImages);
router.get('/tent', getTentImages);
router.get('/mansion', getMansionImages);
router.get('/gallery', getGalleryImages);
router.get('/contact', getContactImages);

router.post('/:page', authenticateToken, upload.single('image'), postImage);
router.put('/:page', authenticateToken, upload.single('image'), modifyImage);
router.delete('/:page/:id', authenticateToken, deleteImage);


export default router;