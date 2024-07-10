import express from 'express';
import { getImages } from '../controllers/imagesController';

const router = express.Router();

router.get('/images', getImages);


export default router;