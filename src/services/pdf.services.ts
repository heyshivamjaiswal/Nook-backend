import axios from 'axios';
import { createRequire } from 'module';

// 1. Create a require function that works in ESM
const require = createRequire(import.meta.url);
// 2. Import the CJS module correctly
const pdfParse = require('pdf-parse');

export const loadPDF = async (url: string) => {
  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
    });

    // 3. pdf-parse is now correctly identified as a callable function
    const data = await pdfParse(Buffer.from(response.data));

    return {
      title: data.info?.Title || 'PDF Document',
      text: data.text,
      metadata: data.metadata,
    };
  } catch (error) {
    throw new Error(
      `Failed to parse PDF: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
};
