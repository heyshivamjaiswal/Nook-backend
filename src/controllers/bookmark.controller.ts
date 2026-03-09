import type { Request, Response } from 'express';
import { prisma } from '../db/prisma.js';
import { error } from 'node:console';

export async function addBookmark(req: Request, res: Response) {
  try {
    const { userId, title, url, type } = req.body;

    if (!userId || !url) {
      return res.status(400).json({
        error: 'userId and url are required',
      });
    }

    const bookmark = await prisma.bookmark.create({
      data: {
        userId,
        url,
        title: title ?? url,
        type: type ?? 'article',
      },
    });
    res.json({
      success: true,
      bookmark,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create bookmark' });
  }
}

export async function listBookmark(req: Request, res: Response) {
  try {
    const userId = req.query.userId as string;

    if (!userId) {
      return res.status(400).json({
        error: 'userId is required',
      });
    }
    const bookmarks = await prisma.bookmark.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.json({
      success: true,
      bookmarks,
    });
  } catch (err) {
    res.status(500).json({
      error: 'Failed to fetch bookmark',
    });
  }
}
