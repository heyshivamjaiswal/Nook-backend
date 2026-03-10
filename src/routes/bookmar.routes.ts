import express from 'express';
import { addBookmark } from '../controllers/bookmark.controller.js';

const router = express.Router();

router.post('/bookmarks', addBookmark);

export default router;
