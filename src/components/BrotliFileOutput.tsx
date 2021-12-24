import { FileDownload } from '@mui/icons-material';
import {
  Button,
  ButtonProps,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React from 'react';

const BrotliFileOutput = (props: ButtonProps) => {
  const theme = useTheme();

  const comfortableDensity = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <>
      {comfortableDensity ? (
        <Button
          variant="outlined"
          startIcon={<FileDownload />}
          sx={{
            flexShrink: 0,
          }}
          {...props}
        >
          Download
        </Button>
      ) : (
        <IconButton color="primary" size="large" {...props}>
          <FileDownload />
        </IconButton>
      )}
    </>
  );
};

export default BrotliFileOutput;
