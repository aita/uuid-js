/* global window */
const sha1sum = require('./lib/sha1sum');
const utf8 = require('./lib/utf8');
const binascii = require('./lib/binascii');

let getRandomBytes;
if (typeof window !== 'undefined') {
  const crypto = window.crypto || window.msCrypto;
  if (crypto && crypto.getRandomValues) {
    const _getRandomBytes = buf => {
      crypto.getRandomValues(buf);
      return buf;
    };
    try {
      // ensure it really works
      _getRandomBytes(new Uint8Array(16));
      // if it works well, then we use
      getRandomBytes = _getRandomBytes
    } catch(e) {}
  }
}

if (getRandomBytes === void 0) {
  getRandomBytes = buf => {
    for (let i = 0; i < buf.length; ++i) {
      buf[i] = Math.floor(Math.random() * 255);
    }
    return buf;
  };
}

class UUID {
  constructor(bytes) {
    if (bytes.length != 16) {
      throw Error('invalid length for an UUID byte array');
    }
    if (bytes instanceof Uint8Array) {
      this.bytes = bytes;
    } else {
      this.bytes = new Uint8Array(bytes);
    }

    if (!this.isNil()) {
      this.version = this.bytes[6] >>> 4;
      this.variant = getVariant(this.bytes[8] >>> 5);
    }
  }

  isNil() {
    return this.bytes.every(n => n === 0);
  }
};

const getVariant = n => {
  if ((n >>> 2) === 0) // 0xx
    return 'ncs';
  else if ((n >>> 1) === 2) // 10x
    return 'rfc4122';
  else if (n === 6) // 110
    return 'microsoft';
  else // 111
    return 'future';
};

const v4 = () => {
  const uu = getRandomBytes(new Uint8Array(16));

  uu[6] = (uu[6] & 0x0F) | 0x40;
  uu[8] = (uu[8] & 0x3F) | 0x80;

  return new UUID(uu);
};

const v5 = (namespace, name) => {
  let ns;
  if (namespace.constructor === String) {
    ns = parse(namespace);
  } else if (namespace instanceof UUID) {
    ns = namespace;
  } else {
    // it may be a byte array
    ns = new UUID(namespace);
  }

  const utf8name = utf8(name);
  const buf = new Uint8Array(ns.bytes.length + utf8name.length);
  buf.set(ns.bytes, 0);
  buf.set(utf8name, ns.bytes.length);
  const hash = sha1sum(buf);
  const uu = new Uint8Array(hash.slice(0, 16));

  uu[6] = (uu[6] & 0x0F) | 0x50;
  uu[8] = (uu[8] & 0x3F) | 0x80;

  return new UUID(uu);
};

const uuidRegex = /\{?(?:urn:uuid:)?([a-f0-9]{8})-?([a-f0-9]{4})-?([a-f0-9]{4})-?([a-f0-9]{4})-?([a-f0-9]{12})\}?/i;

const parse = s => {
  const m = s.match(uuidRegex);
  if (!m) {
    throw Error('ill-formed UUID string')
  }
  const hex = m.slice(1, 6).join('').toLowerCase();
  return new UUID(binascii.unhexlify(hex));
};

const stringify = uuid => {
  const uu = uuid.bytes;
  const hex = binascii.bin2hex;

  let i = 0;
  return [
    hex[uu[i++]], hex[uu[i++]], hex[uu[i++]], hex[uu[i++]], '-',
    hex[uu[i++]], hex[uu[i++]], '-',
    hex[uu[i++]], hex[uu[i++]], '-',
    hex[uu[i++]], hex[uu[i++]], '-',
    hex[uu[i++]], hex[uu[i++]], hex[uu[i++]], hex[uu[i++]], hex[uu[i++]], hex[uu[i++]],
  ].join('');
};

const hexlify = uuid => binascii.hexlify(uuid.bytes);

module.exports = {
  UUID,
  v4,
  v5,
  parse,
  stringify,
  hexlify,
}
