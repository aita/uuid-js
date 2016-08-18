import { Buffer } from 'buffer';

interface VerifyResult {
  version: number;
}

const verify = (uuid: Buffer | string): VerifyResult => {
  return {
    version: 4,
  };
};

export default verify;
