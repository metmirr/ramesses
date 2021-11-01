import { decodeTxRaw } from '@cosmjs/proto-signing';

export function decode(bytesTx: Uint8Array) {
  const tx = decodeTxRaw(bytesTx);
  return tx;
}

export function decodeMessage(message: any) {
  return message;
}
