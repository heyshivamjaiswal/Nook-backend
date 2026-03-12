import { chunkTexts } from '../../chunk/chunkText.js';
import { cleanText } from '../../utils/cleanText.js';
import { storeChunk } from '../../vector/storeChunk.js';
import { loadPDF } from '../pdf.services.js';

export async function processPDF(filePath: string, userId: string) {
  const text = await loadPDF(filePath);

  const cleaned = await cleanText(text.text);

  const chunks = await chunkTexts(cleaned);

  await storeChunk(0, userId, chunks);

  return {
    chunkCount: chunks.length,
  };
}
