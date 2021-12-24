import { Start } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import React from 'react';
import { UseBrotliWorkerInterface } from '../worker/useBrotliWorker';

export enum BrotliModes {
  Compress = 'compress',
  Decompress = 'decompress',
}

export interface OptionsGroupProps {
  onStart: (mode: BrotliModes) => void;
  running?: boolean;
  isReady?: boolean;
  modeState: [BrotliModes, React.Dispatch<React.SetStateAction<BrotliModes>>];
  brotliWorker: UseBrotliWorkerInterface;
}

const OptionsGroup = ({
  onStart,
  running,
  isReady,
  modeState: [mode, setMode],
}: OptionsGroupProps) => {
  return (
    <Grid container direction="column" spacing={1} alignItems="center">
      <Grid item>
        <ToggleButtonGroup
          exclusive
          value={mode}
          onChange={(e, v) => {
            console.log('mode: ', mode);
            if (v !== null) {
              setMode(v);
            }
          }}
          color="primary"
          size="small"
        >
          <ToggleButton value={BrotliModes.Compress}>Compress</ToggleButton>
          <ToggleButton value={BrotliModes.Decompress}>Decompress</ToggleButton>
        </ToggleButtonGroup>
      </Grid>

      <Grid item>
        <LoadingButton
          loadingPosition="start"
          startIcon={<Start />}
          variant="outlined"
          onClick={() => onStart(mode)}
          loading={running}
          disabled={!isReady}
        >
          Start
        </LoadingButton>
      </Grid>

      <Grid item>
        <FormGroup>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Auto-download output file"
            // TODO: add auto-download
            disabled={true}
          />
        </FormGroup>
      </Grid>
    </Grid>
  );
};

export default OptionsGroup;
