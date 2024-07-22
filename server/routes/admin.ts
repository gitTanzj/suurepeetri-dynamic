import express from 'express';
import { adminLogin, adminRegister } from '../controllers/adminController';

const router = express.Router();

router.post('/register', adminRegister)
router.post('/login', adminLogin);

export default router;