import { Buffer } from 'buffer';

const parse = (uuidString: string): Buffer => {
  return new Buffer('UUID', 'utf8');
};

export default parse;
