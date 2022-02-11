import express from 'express';
import { CreateVandor, GetVandorByID, GetVandors } from '../controllers/AdminController';

const router = express.Router();

router.post('/vandor', CreateVandor);
router.get('/vandor', GetVandors);
router.get('/vandor/:id', GetVandorByID);

export { router as AdminRoute } 