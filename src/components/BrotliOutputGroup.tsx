import { alpha, Box, Divider, useTheme } from '@mui/material';
import React, { useMemo } from 'react';
import BrotliFileOutput from './BrotliFileOutput';
import BrotliTextField from './BrotliTextInput';

export interface BrotliInputProps {
  /** disables fields (such as when there is no output yet) */
  disabled?: boolean;
  /** is the current mode "compress"? */
  modeCompress?: boolean;
  /** the output array buffer from brotli, the input size in bytes to compare against output as % compressed */
  output: [string, number];
}

const BrotliInputGroup = ({
  disabled,
  modeCompress,
  output: [output, inputSize],
}: BrotliInputProps) => {
  const theme = useTheme();

  const boxColour = theme.palette.grey[400];

  const outputPercent = useMemo(
    () =>
      (modeCompress
        ? ((output.length / 2) * 100) / (inputSize || 1) // prevent zero division
        : (output.length * 100) / (inputSize / 2 || 1)
      ).toFixed(2),
    [modeCompress, output, inputSize]
  );

  return (
    <Box
      sx={{
        m: 1,
        p: 2,
        border: '1px solid',
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
        value={output}
        // placeholder={(!modeCompress ? 'Text' : 'Hex') + ' output'}
        label={(!modeCompress ? 'Text' : 'Hex') + ' output'}
        helperText={
          (modeCompress
            ? `${output.length / 2} bytes`
            : `${output.length} characters / bytes`) + ` (${outputPercent}%)`
        }
        InputProps={{
          readOnly: true,
        }}
      />

      <Divider
        orientation="vertical"
        flexItem
        sx={{
          mx: [0, 1],
          transform: 'skewX(-8deg)',
          borderColor: theme.palette.text.secondary,
        }}
      >
        or
      </Divider>

      <BrotliFileOutput
        // TODO: update
        // disabled={disabled}
        disabled={true}
        onClick={() => console.log('should generate and download the file')}
      />
    </Box>
  );
};

export default BrotliInputGroup;

// import { alpha, Box, ButtonProps, Divider, useTheme } from '@mui/material';
// import React, { useEffect, useMemo, useState } from 'react';
// import BrotliTextInput from './BrotliTextInput';

// export interface BrotliOutputProps {
//   button: (props: ButtonProps) => JSX.Element;
//   /** should this group be highlighted? */
//   focused?: boolean;
//   /** disables fields (such as when there is no output yet) */
//   disabled?: boolean;
//   /** don't allow text box to receive input */
//   readOnly?: boolean;

//   /** callback to provide the new input */
//   setInput?: (input: ArrayBuffer | string) => void;
//   /** callback to set ready status */
//   setIsReady?: (ready: boolean) => void;
// }

// const BrotliOutputGroup = ({
//   button: Button,
//   disabled,
//   focused,
//   readOnly,
//   setInput,
//   setIsReady,
// }: BrotliOutputProps) => {
//   const theme = useTheme();

//   const boxColour = focused
//     ? theme.palette.primary.main
//     : theme.palette.grey[400];

//   // const [textInput, setTextInput] = useState<string>('');
//   // const [fileInput, setFileInput] = useState<ArrayBuffer>();
//   // file selected should be displayed and disable textfield

//   const useFile = useMemo(() => Boolean(fileInput), [fileInput]);

//   useEffect(() => {
//     setIsReady && setIsReady(Boolean(textInput || fileInput));
//   }, [textInput, fileInput, setIsReady]);

//   useEffect(() => {
//     // if useFile is true, then fileInput should not be null
//     const file = fileInput !== undefined ? fileInput : new ArrayBuffer(0);
//     setInput && setInput(useFile ? file : textInput);
//   }, [useFile, fileInput, textInput, setInput]);

//   return (
//     <Box
//       sx={{
//         m: 1,
//         p: 2,
//         border: '1px dashed',
//         borderColor: alpha(boxColour, 0.75),
//         borderRadius: 3,
//         display: 'flex',
//         alignItems: 'center',
//         width: '80%',
//         maxWidth: 500,
//         backgroundColor: alpha(boxColour, 0.2),
//         opacity: disabled ? 0.5 : 1,
//       }}
//     >
//       <BrotliTextInput
//         value={textInput}
//         InputProps={{
//           readOnly: true,
//         }}
//       />

//       <Divider
//         // light
//         orientation="vertical"
//         flexItem
//         sx={{
//           // display: ['none', 'initial'],
//           mx: [0, 1],
//           transform: 'skewX(-8deg)',
//           borderColor: theme.palette.text.secondary,
//         }}
//       >
//         or
//       </Divider>

//       <Button disabled={disabled} />
//     </Box>
//   );
// };

// export default BrotliOutputGroup;
