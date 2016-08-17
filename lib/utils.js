const bytesToWords = (bytes, words = []) => {
  for (let i = 0; i < bytes.length; i++) {
    words[i >>> 2] |= bytes[i] << (24 - 8 * (i % 4));
  }
  return words;
};

const wordsToBytes = (words, bytes = []) => {
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

module.exports = {
  bytesToWords,
  wordsToBytes,
};
