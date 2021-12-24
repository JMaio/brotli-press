import { createTheme } from '@mui/material';

export default function defaultTheme(prefersDarkMode: boolean) {
  return createTheme({
    palette: {
      mode: prefersDarkMode ? 'dark' : 'light',
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  });
}
