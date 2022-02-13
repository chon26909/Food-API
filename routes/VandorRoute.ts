import express, { Request, Response, NextFunction } from 'express';
import { GetVandorProfile, VandorLogin } from '../controllers/VandorController';
import { Authenticate } from '../middleware';

const router = express.Router();

router.post('/login',VandorLogin);

router.use(Authenticate);
router.get('/profile', GetVandorProfile)

export { router as VandorRoute };