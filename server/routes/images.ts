import express from 'express';
import { getGalleryImages } from '../controllers/imagesController';

const router = express.Router();

router.get('/images', getGalleryImages);


export default router;