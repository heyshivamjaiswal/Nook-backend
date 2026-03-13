import axios from 'axios';
import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';
import * as cheerio from 'cheerio';

async function fetchWithRetry(url: string, retries = 3) {
  try {
    const response = await axios.get(url, {
      timeout: 10000,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    return response.data;
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying ${url}... (${retries})`);
      return fetchWithRetry(url, retries - 1);
    }

    throw error;
  }
}

export async function scrapeArticle(url: string) {
  const html = await fetchWithRetry(url);

  // First try Readability
  const dom = new JSDOM(html, { url });

  const reader = new Readability(dom.window.document);
  const article = reader.parse();

  if (article?.textContent) {
    return {
      title: article.title || 'Article',
      text: article.textContent,
    };
  }

  // Fallback extraction
  const $ = cheerio.load(html);

  const paragraphs = $('p')
    .map((_, el) => $(el).text())
    .get()
    .join('\n\n');

  if (paragraphs.length < 400) {
    throw new Error('content too small to ingest');
  }

  return {
    title: $('title').text() || 'Article',
    text: paragraphs,
  };
}
