import type { Request, Response } from 'express';
import { processPDF } from '../services/pipeline/pdfProcess.js';

export async function uploadPDF(req: Request, res: Response) {
  try {
    const file = req.file;
    const { userId } = req.body;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const result = await processPDF(file.path, userId);

    res.json({
      success: true,
      result,
    });
  } catch (err) {
    res.status(500).json({
      error: 'PDF processing failed',
    });
  }
}
