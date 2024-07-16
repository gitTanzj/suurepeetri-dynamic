import express from 'express';
import { getAboutContent, getContactContent, getTentContent, getMansionContent } from '../controllers/contentsController';

const router = express.Router();

router.get('/contents', getAboutContent);
router.get('/contact', getContactContent)
router.get('/tent', getTentContent)
router.get('/mansion', getMansionContent)

export default router;
