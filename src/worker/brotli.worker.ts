import * as brotliPromise from 'brotli-wasm';

import { BrotliWorkerMessage, BrotliWorkerOp } from '../types/brotli';

const brotli = await brotliPromise; // Import is async in browsers due to wasm requirements!

onmessage = async (e: MessageEvent<BrotliWorkerMessage>) => {
  console.log('BrotliWorker starting...');
  // const brotli = await brotliPromise;

  let out;
  switch (e.data.op) {
    case BrotliWorkerOp.BROTLI_COMPRESS:
      out = brotli.compress(e.data.data);
      break;
    case BrotliWorkerOp.BROTLI_DECOMPRESS:
      out = brotli.decompress(e.data.data);
      break;
  }
  postMessage(out);
};

// eslint-disable-next-line no-restricted-globals
onerror = e => {
  console.error('error from web worker', e);
};
