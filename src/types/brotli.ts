export interface BrotliInterface {
  compress: (buf: Buffer) => Uint8Array;
  decompress: (buf: Uint8Array) => Uint8Array;
}

export enum BrotliWorkerOp {
  // eslint-disable-next-line no-unused-vars
  BROTLI_COMPRESS,
  // eslint-disable-next-line no-unused-vars
  BROTLI_DECOMPRESS,
}

export interface BrotliWorkerMessage {
  op: BrotliWorkerOp;
  data: Uint8Array;
}
