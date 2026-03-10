import { embedding } from '../embeddings/embed.js';
import { index } from '../vector/pinecone.js';

export async function searchChunks(question: string, bookmarkId: number) {
  const queryVector = await embedding.embedQuery(question);

  const result = await index.query({
    vector: queryVector,
    topK: 5,
    includeMetadata: true,
    filter: {
      bookmarkId: { $eq: bookmarkId },
    },
  });

  return result.matches;
}
