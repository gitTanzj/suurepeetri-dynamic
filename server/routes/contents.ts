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

router.post('/about/update',  changeAboutContent);
router.post('/contact/update', changeContactContent);
router.post('/housing/:type/update', changeHousingOptionContent);

export default router;
