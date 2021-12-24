import { UploadFile } from '@mui/icons-material';
import {
  Button,
  ButtonProps,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React from 'react';

const BrotliFileInput = ({
  file,
  setFile,
  ...props
}: { file?: File; setFile?: (file: File) => void } & ButtonProps) => {
  const theme = useTheme();

  const comfortableDensity = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <>
      {comfortableDensity ? (
        <Button
          variant="outlined"
          startIcon={<UploadFile />}
          sx={{
            flexShrink: 0,
          }}
          {...props}
        >
          Upload
        </Button>
      ) : (
        <IconButton color="primary" size="large" {...props}>
          <UploadFile />
        </IconButton>
      )}
    </>
  );
};

export default BrotliFileInput;
