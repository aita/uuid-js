const utf8ify = (input: string) => {
  const utf8ified = unescape(encodeURIComponent(input));
  const buf = new Uint8Array(utf8ified.length);

  for (let i = 0; i < buf.length; i++) {
    buf[i] = utf8ified.charCodeAt(i);
  }

  return buf;
};