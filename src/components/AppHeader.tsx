import { GitHub } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import React from 'react';

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
      <Typography variant="subtitle1" paragraph sx={{ lineHeight: 1.5, my: 1 }}>
        Brotli de/compress in-browser with WebAssembly
      </Typography>
      <Button
        size="small"
        variant="outlined"
        startIcon={<GitHub />}
        href="https://github.com/httptoolkit/brotli-wasm"
        target="_blank"
        sx={{ textTransform: 'none', fontFamily: 'monospace', borderRadius: 5 }}
      >
        brotli-wasm
      </Button>
    </header>
  );
};

export default AppHeader;
