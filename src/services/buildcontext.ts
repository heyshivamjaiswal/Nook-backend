export function buildContext(matches: any[]) {
  return matches.map((m) => m.metadata.text).join('\n\n');
}
