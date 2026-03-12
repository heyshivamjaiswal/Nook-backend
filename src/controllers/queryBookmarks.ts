import express, { type Request, type Response } from 'express';
import { queryBookmark } from '../services/pipeline/queryBookmark.js';

export async function askController(req: Request, res: Response) {
  const { question, bookmarkId } = req.body;

  const answer = await queryBookmark(question, bookmarkId);

  res.json({ answer });
}
