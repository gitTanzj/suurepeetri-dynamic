import express from 'express';
import {
    getAboutContent,
    getOneAboutContent,

    getContactContent,
    getOneContactContent,

    getHousingOptionsContent,
    getHousingOptionContent,

    changeAboutContent,
    changeContactContent,
    changeHousingOptionContent
} from '../controllers/contentsController';

const router = express.Router();

router.get('/about', getAboutContent);
router.get('/about/:id', getOneAboutContent);

router.get('/contact', getContactContent);
router.get('/contact/:id', getOneContactContent);

router.get('/housing', getHousingOptionsContent);
router.get('/housing/:id', getHousingOptionContent);

router.put('/about/:id',  changeAboutContent);
router.put('/contact/:id', changeContactContent);
router.put('/housing/:id', changeHousingOptionContent);

export default router;
