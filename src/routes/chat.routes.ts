import express from 'express';
import { chatWithBookmark } from '../controllers/chat.controller.js';

const router = express.Router();

router.post('/chat', chatWithBookmark);

export default router;
