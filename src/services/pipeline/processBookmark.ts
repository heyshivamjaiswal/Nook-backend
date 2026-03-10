import { chunkTexts } from '../../chunk/chunkText.js';
import { cleanText } from '../../utils/cleanText.js';
import { storeChunk } from '../../vector/storeChunk.js';
import { loadContent } from '../contentLoader.js';

export async function processBookmarks(
  bookmarkId: number,
  userId: string,
  url: string
) {
  //load the article/pdf/youtube content
  const content = await loadContent(url);

  //clean text
  if (!content.text) {
    throw new Error('No text extracted from article');
  }
  const cleaned = cleanText(content.text);

  //chunk text
  const chunkInput = await chunkTexts(cleaned);

  //store embedding in vector db
  await storeChunk(bookmarkId, userId, chunkInput);

  return {
    title: content.text,
    chunkCount: chunkInput.length,
  };
}
