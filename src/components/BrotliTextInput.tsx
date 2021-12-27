import { TextField, TextFieldProps } from '@mui/material';
import React from 'react';

const BrotliTextField = ({ ...props }: TextFieldProps) => {
  return (
    <>
      <TextField
        fullWidth
        multiline
        minRows={3}
        // rows={5}
        maxRows={8}
        size="small"
        // display the number of characters below the text field in monospace font
        sx={{
          '& .MuiFormHelperText-root': {
            fontFamily: 'monospace',
          },
        }}
        {...props}
      />
    </>
  );
};

export default BrotliTextField;
