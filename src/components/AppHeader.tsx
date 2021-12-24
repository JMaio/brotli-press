import React from 'react';
import { Typography } from '@mui/material';

const AppHeader = (props: any) => {
  return (
    <header className="App-header">
      <Typography
        variant="h3"
        component="h1"
        fontStyle="oblique"
        fontFamily="monospace"
        sx={{
          backgroundColor: 'action.disabledBackground',
          borderRadius: 2,
        }}
      >
        brotli-press
      </Typography>
      <Typography variant="subtitle1" paragraph sx={{ lineHeight: 1.5 }}>
        Brotli compress / decompress in-browser with WebAssembly
      </Typography>
    </header>
  );
};

export default AppHeader;
