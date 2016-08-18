const wordsToBytes = (words: any[], bytes: any[] = []): any[] => {
  let p = 0;

  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    bytes[p++] = 0xFF & (w >>> 24);
    bytes[p++] = 0xFF & (w >>> 16);
    bytes[p++] = 0xFF & (w >>> 8);
    bytes[p++] = 0xFF & w;
  }

  return bytes;
};

export default wordsToBytes;
