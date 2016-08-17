const test = require("ava");
const sha1sum = require('../lib/sha1sum');
const { unhexlify } = require('../lib/binascii');

const str2bytes = str => new Uint8Array(new Buffer(str));

test ('sha1sum generates the SHA1 hash from a byte array', t => {
  t.deepEqual(sha1sum(str2bytes('hello')), unhexlify('aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d'));
});
