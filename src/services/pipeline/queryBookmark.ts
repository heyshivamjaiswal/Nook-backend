import { searchChunks } from '../searchChunks.js';
import { askLLM } from '../../llm/generateAnswer.js';

export async function queryBookmark(question: string, bookmarkId: number) {
  // 1 retrieve chunks
  const matches = await searchChunks(question, bookmarkId);

  // 2 build context
  const context = matches?.map((m) => m.metadata?.text).join('\n\n');

  // 3️ ask LLM
  const answer = await askLLM(context, question);

  return answer;
}
