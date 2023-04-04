export function extractHashtags(str: string): string[] {
  const regex = /#\p{L}+/gu;
  const matches = [...str.matchAll(regex)].map((match) => match[0]);
  return matches;
}
