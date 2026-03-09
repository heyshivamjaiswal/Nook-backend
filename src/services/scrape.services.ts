import { Readability } from '@mozilla/readability';
import axios from 'axios';
import { JSDOM } from 'jsdom';

export async function scrapeArticle(url: string) {
  const response = await axios.get(url);

  const dom = new JSDOM(response.data, {
    url,
  });

  const reader = new Readability(dom.window.document);
  const article = reader.parse();

  if (!article) {
    throw new Error('Failed to parse article');
  }

  return {
    title: article.title,
    text: article.textContent,
  };
}
