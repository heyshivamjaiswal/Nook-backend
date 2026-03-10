import type { Request, Response } from 'express';
import { searchChunks } from '../services/searchChunks.js';
import { buildContext } from '../services/buildcontext.js';
import { askLLM } from '../llm/generateAnswer.js';

export async function chatWithBookmark(req: Request, res: Response) {
  try {
    const { bookmarkId, question } = req.body;

    if (!bookmarkId || !question) {
      return res.status(400).json({
        error: 'bookmarkId and question required',
      });
    }

    //1. Retrieve relevent chunks
    const matches = await searchChunks(question, bookmarkId);

    //2.Build context from retrieved chunks
    const context = buildContext(matches);

    //ask llm
    const answer = await askLLM(context, question);

    res.json({
      success: true,
      answer,
    });
  } catch (err) {
    res.status(500).json({
      error: 'chat failed',
    });
  }
}
