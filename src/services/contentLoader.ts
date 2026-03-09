import { detectSource } from './detectSource.js';
import { loadPDF } from './pdf.services.js';
import { scrapeArticle } from './scrape.services.js';
import { loadYouTubeTranscript } from './youtube.service.js';

export async function loadContent(input: string) {
  const type = detectSource(input);

  if (type === 'web') return scrapeArticle(input);

  if (type === 'pdf') return loadPDF(input);

  if (type === 'youtube') return loadYouTubeTranscript(input);

  return {
    title: 'Text',
    text: input,
  };
}
