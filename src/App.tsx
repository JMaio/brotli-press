import {
  Box,
  responsiveFontSizes,
  ThemeProvider,
  useMediaQuery,
} from '@mui/material';
import { Buffer } from 'buffer';
import React, { useMemo, useState } from 'react';
import './App.scss';
import AppHeader from './components/AppHeader';
import BrotliInputGroup from './components/BrotliInputGroup';
import BrotliOutputGroup from './components/BrotliOutputGroup';
import OptionsGroup, { BrotliModes } from './components/OptionsGroup';
import useTextOrFileInput, {
  UseTextOrFileInputInterface,
} from './hooks/useTextOrFileInput';
import defaultTheme from './theme/defaultTheme';
import { measureAsyncFn } from './util/measureAsyncFn';
import { useBrotliWorker } from './worker/useBrotliWorker';

const App = () => {
  // theme
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(
    () => responsiveFontSizes(defaultTheme(prefersDarkMode)),
    [prefersDarkMode]
  );

  // brotli worker
  const brotliWorker = useBrotliWorker();

  // compression vars
  const [mode, setMode] = useState(BrotliModes.Compress);
  const modeCompress = useMemo(() => mode === BrotliModes.Compress, [mode]);

  const compressInput: UseTextOrFileInputInterface = useTextOrFileInput();
  const decompressInput: UseTextOrFileInputInterface = useTextOrFileInput();
  const [isInputReady, setIsInputReady] = useState(false);

  const [running, setRunning] = useState(false);

  // store the: [output, input size] at (de)compress time
  const [compressOutput, setCompressOutput] = useState<[string, number]>([
    '',
    0,
  ]);
  const [decompressOutput, setDecompressOutput] = useState<[string, number]>([
    '',
    0,
  ]);

  const performOperation = (mode: BrotliModes) => {
    setRunning(true);

    console.log('mode: ', mode);

    const [brotliInput, getVal, f, outFn, set] = modeCompress
      ? [
          compressInput,
          (v: string) => Buffer.from(v),
          brotliWorker.compress,
          (buf: Buffer) => Buffer.from(buf).toString('hex'),
          setCompressOutput,
        ]
      : [
          decompressInput,
          (v: string) => Buffer.from(v, 'hex'),
          brotliWorker.decompress,
          (buf: Buffer) => Buffer.from(buf).toString(),
          setDecompressOutput,
        ];

    measureAsyncFn(async () => {
      const { text, file, useFile, inputSize } = brotliInput;
      let out = '';
      try {
        if (useFile && file) {
          // TODO: add file input
          // f(input.file.arrayBuffer).then(set);
        } else {
          const tmp = await f(getVal(text));
          out = outFn(tmp);
        }
        set([out, inputSize]);
        console.log(out.length, out);
      } catch (e) {
        console.error(e);
      }

      setRunning(false);

      // const { textRef, fileRef, useFile } = brotliInput;
      // let out = '';
      // if (useFile && fileRef.current) {
      //   // TODO: add file input
      //   // f(input.file.arrayBuffer).then(set);
      // } else if (textRef.current) {
      //   const tmp = await f(getVal(textRef.current.value));
      //   out = outFn(tmp);
      // }
    }).then(t => console.info('time:', mode, t));
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: 'background.paper',
          color: 'text.primary',
          display: 'flex',
          minWidth: '100%',

          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            padding: [1, 2],
            width: 720, // works like max-width

            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AppHeader />

          <BrotliInputGroup
            brotliInput={modeCompress ? compressInput : decompressInput}
            setIsReady={setIsInputReady}
            modeCompress={modeCompress}
          />

          <OptionsGroup
            modeState={[mode, setMode]}
            isReady={isInputReady}
            running={running}
            onStart={performOperation}
          />

          <BrotliOutputGroup
            output={modeCompress ? compressOutput : decompressOutput}
            modeCompress={modeCompress}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
