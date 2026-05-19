import express from 'express'
import { getUserController } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddlware.js';

const router = express.Router();

router.get("/get",authMiddleware,getUserController);

export default router;