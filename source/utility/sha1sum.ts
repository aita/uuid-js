import bytesToWords from './bytesToWords';
import wordsToBytes from './wordsToBytes';

const sha1sum = (bytes: any[]): any[] => {
  const M = bytesToWords(bytes);
  // padding
  const bitLength = bytes.length * 8;
  M[bitLength >>> 5] |= 0x80 << (24 - bitLength % 32);
  M[((bitLength + 64 >>> 9) << 4) + 15] = bitLength;

  const W = new Uint32Array(80);
  const H = new Uint32Array([
    0x67452301,
    0xEFCDAB89,
    0x98BADCFE,
    0x10325476,
    0xC3D2E1F0,
  ]);
  for (let i = 0, l = M.length; i < l; i += 16) {
    let [A, B, C, D, E] = H;
    for (let t = 0; t < 80; t++) {
      if (t < 16) {
        W[t] = M[t + i];
      } else {
        // W(t) = S^1(W(t-3) XOR W(t-8) XOR W(t-14) XOR W(t-16)).
        const x = W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16];
        W[t] = (x << 1) | (x >>> 31);
      }
      // TEMP = S^5(A) + f(t;B,C,D) + E + W(t) + K(t);
      let temp = ((A << 5) | (A >>> 27)) + E + W[t];
      if (t < 20) {
        temp += (B & C | ~B & D) + 0x5A827999;
      } else if (t < 40) {
        temp += (B ^ C ^ D) + 0x6ED9EBA1;
      } else if (t < 60) {
        temp += (B & C | B & D | C & D) + 0x8F1BBCDC;
      } else {
        temp += (B ^ C ^ D) + 0xCA62C1D6;
      }

      E = D;
      D = C;
      C = (B << 30) | (B >>> 2);
      B = A;
      A = temp;
    }

    H[0] += A;
    H[1] += B;
    H[2] += C;
    H[3] += D;
    H[4] += E;
  }

  return wordsToBytes(H);
};