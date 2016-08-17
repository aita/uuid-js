const bin2hex = [];
for (let i = 0; i < 256; i++) {
  const s = i.toString(16);
  bin2hex[i] = s.length === 2 ? s : '0' + s;
}

const hexlify = bytes => bytes.map(b => bin2hex[b]).join('');

const unhexlify = (s, buf = []) => {
  let p = 0;
  for (let i = 0; i < s.length; i += 2) {
    buf[p++] = parseInt(s.substr(i, 2), 16);
  }
  return buf;
}

module.exports = {
  bin2hex,
  hexlify,
  unhexlify,
};
