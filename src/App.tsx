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
import useTextOrFileInput from './hooks/useTextOrFileInput';
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

  const brotliInput = useTextOrFileInput();
  const [isInputReady, setIsInputReady] = useState(false);

  const [running, setRunning] = useState(false);

  const [compressOutput, setCompressOutput] = useState<string>('');
  const [decompressOutput, setDecompressOutput] = useState<string>('');

  const performOperation = (mode: BrotliModes) => {
    setRunning(true);

    console.log('mode: ', mode);
    const modeCompress = mode === BrotliModes.Compress;

    const [getVal, f, outFn, set] = modeCompress
      ? [
          (v: string) => Buffer.from(v),
          brotliWorker.compress,
          (buf: Buffer) => Buffer.from(buf).toString('hex'),
          setCompressOutput,
        ]
      : [
          (v: string) => Buffer.from(v, 'hex'),
          brotliWorker.decompress,
          (buf: Buffer) => Buffer.from(buf).toString(),
          setDecompressOutput,
        ];

    measureAsyncFn(async () => {
      const { textRef, fileRef, useFile } = brotliInput;
      let out = '';
      if (useFile && fileRef.current) {
        // TODO: add file input
        // f(input.file.arrayBuffer).then(set);
      } else if (textRef.current) {
        const tmp = await f(getVal(textRef.current.value));
        out = outFn(tmp);
      }

      set(out);
      setRunning(false);
      console.log(out);
    }).then(t => console.info('time:', mode, t));
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: 'background.paper',
          color: 'text.primary',
          display: 'flex',
          minWidth: '100vw',

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
            brotliInput={brotliInput}
            setIsReady={setIsInputReady}
            modeSwitch={mode === BrotliModes.Compress}
          />

          <OptionsGroup
            modeState={[mode, setMode]}
            isReady={isInputReady}
            running={running}
            onStart={performOperation}
            brotliWorker={brotliWorker}
          />

          <BrotliOutputGroup
            output={
              mode === BrotliModes.Compress ? compressOutput : decompressOutput
            }
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
