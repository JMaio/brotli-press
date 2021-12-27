// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
// import BrotliWorker from 'worker-loader!./brotli.worker';

import { useMemo } from 'react';
import { BrotliWorkerOp } from '../types/brotli';

// @ts-ignore
// import BrotliWorker from './brotli.worker';

export interface UseBrotliWorkerInterface {
  compress: (buf: Buffer) => Promise<Buffer>;
  decompress: (buf: Buffer) => Promise<Buffer>;
}

/**
 * Web worker promise-based Brotli binding.
 */
export const useBrotliWorker = (): UseBrotliWorkerInterface =>
  // would be called on every re-render without useMemo
  useMemo(() => {
    // const brotliWorker: Worker = new BrotliWorker();
    const brotliWorker: Worker = new Worker(
      new URL('./brotli.worker.ts', import.meta.url)
    );
    // const brotliWorker: Worker = new Worker('worker-loader!./brotli.worker.ts');

    const callBrotliWorker = (buf: Buffer, op: BrotliWorkerOp) =>
      new Promise<Buffer>((resolve, reject) => {
        brotliWorker.addEventListener('message', (e: MessageEvent<Buffer>) => {
          console.info('BrotliWorker completed!');
          console.debug(e.data);
          resolve(e.data);
        });

        brotliWorker.postMessage({
          op: op,
          data: buf,
        });
      }).catch(e => {
        console.error(e);
        throw e;
      });

    const compress = (buf: Buffer) =>
      callBrotliWorker(buf, BrotliWorkerOp.BROTLI_COMPRESS);

    const decompress = (buf: Buffer) =>
      callBrotliWorker(buf, BrotliWorkerOp.BROTLI_DECOMPRESS);

    return { compress, decompress };
  }, []);
