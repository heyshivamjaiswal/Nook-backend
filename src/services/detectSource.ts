export function detectSource(input: string) {
  if (input.includes('youtube.com') || input.includes('youtu.be')) {
    return 'youtube';
  }

  if (input.endsWith('.pdf')) {
    return 'pdf';
  }

  if (input.startsWith('http')) {
    return 'web';
  }
  return 'text';
}
