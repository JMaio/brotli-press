import { alpha, Box, Divider, useTheme } from '@mui/material';
import React, { useEffect } from 'react';
import { UseTextOrFileInputInterface } from '../hooks/useTextOrFileInput';
import BrotliFileInput from './BrotliFileInput';
import BrotliTextField from './BrotliTextInput';

export interface BrotliInputProps {
  /** disables fields (such as when there is no output yet) */
  disabled?: boolean;
  /** shows or hides this input */
  modeSwitch: boolean;
  /** the use input hooks */
  brotliInput: UseTextOrFileInputInterface;
  /** callback to set ready status */
  setIsReady?: (ready: boolean) => void;
}

const BrotliInputGroup = ({
  disabled,
  brotliInput: { textRef, fileRef, useFile },
  setIsReady,
}: BrotliInputProps) => {
  const theme = useTheme();

  const boxColour = theme.palette.primary.main;

  //   useEffect(() => {
  //     // tell the parent if there is input present
  //     setIsReady && setIsReady(Boolean(textRef.current?.value || fileRef.current?.value));
  //   }, [textRef, fileRef, setIsReady]);

  return (
    <Box
      sx={{
        m: 1,
        p: 2,
        border: '1px dashed',
        borderColor: alpha(boxColour, 0.75),
        borderRadius: 3,
        display: 'flex',
        alignItems: 'center',
        width: '80%',
        maxWidth: 500,
        backgroundColor: alpha(boxColour, 0.2),
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <BrotliTextField
        placeholder="Text input"
        disabled={disabled || useFile}
        inputRef={textRef}
        // value={text}
        onChange={e => setIsReady && setIsReady(Boolean(e.target.value))}
      />

      <Divider
        // light
        orientation="vertical"
        flexItem
        sx={{
          // display: ['none', 'initial'],
          mx: [0, 1],
          transform: 'skewX(-8deg)',
          borderColor: theme.palette.text.secondary,
        }}
      >
        or
      </Divider>

      <BrotliFileInput
        // TODO: enable file upload
        // disabled={disabled}
        disabled={true}
        // file={file}
      />
    </Box>
  );
};

export default BrotliInputGroup;
