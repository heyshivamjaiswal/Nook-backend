import pdfParse from 'pdf-parse';
import axios from 'axios';

export async function loadPDF(url: string) {
  const response = await axios.get(url, {
    responseType: 'arraybuffer',
  });

  const data = await pdfParse(response.data);
  return {
    title: 'PDF Document',
    text: data.text,
  };
}
