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
        // sx={{
        //   // width: 160,
        //   flexGrow: 1,
        // }}
        {...props}
      />
    </>
  );
};

export default BrotliTextField;
