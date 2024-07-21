import express from 'express';
import {
    getAboutContent,
    getContactContent,
    getHousingOptionsContent,
    getHousingOptionContent,

    changeAboutContent,
    changeContactContent,
    changeHousingOptionContent
} from '../controllers/contentsController';

const router = express.Router();

router.get('/about', getAboutContent);
router.get('/contact', getContactContent);
router.get('/housing', getHousingOptionsContent);
router.get('/housing/:type', getHousingOptionContent);

router.put('/about/:id',  changeAboutContent);
router.put('/contact/:id', changeContactContent);
router.put('/housing/:id', changeHousingOptionContent);

export default router;
