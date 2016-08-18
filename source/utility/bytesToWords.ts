const bytesToWords = (bytes: any[], words: any[] = []) => {
  for (let i = 0; i < bytes.length; i++) {
    words[i >>> 2] |= bytes[i] << (24 - 8 * (i % 4));
  }

  return words;
};

export default bytesToWords;
