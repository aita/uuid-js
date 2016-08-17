/* global unescape, encodeURIComponent */
module.exports = s => {
  const utf8str = unescape(encodeURIComponent(s));
  const buf = new Uint8Array(utf8str.length);
  for (let i = 0; i < buf.length; i++) {
    buf[i] = utf8str.charCodeAt(i);
  }
  return buf;
};
