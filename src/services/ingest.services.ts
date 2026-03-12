import { embedding } from '../embeddings/embed.js';
import { chunkTexts } from '../chunk/chunkText.js';
import { scrapeArticle } from './scrape.services.js';
import { index } from '../vector/pinecone.js';
import { loadContent } from './contentLoader.js';
import { cleanText } from '../utils/cleanText.js';
export async function ingestBookmark(
  url: string,
  userId: string,
  bookmarkId: number
) {
  const content = await loadContent(url);

  if (!content.text) {
    throw new Error('No text extracted');
  }

  const cleaned = cleanText(content.text);

  const chunks = await chunkTexts(cleaned);

  const embeddings = await embedding.embedDocuments(chunks);

  const records = chunks.map((chunk: string, i: number) => ({
    id: `${bookmarkId}_${i}`,
    values: embeddings[i],
    metadata: {
      userId,
      bookmarkId,
      chunkIndex: i,
      text: chunk,
    },
  }));

  await index.upsert({
    records,
  });
}
