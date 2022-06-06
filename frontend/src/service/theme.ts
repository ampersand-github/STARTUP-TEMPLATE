import { createTheme } from '@mui/material';
import { purple } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: purple[500],
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
    error: {
      main: '#FF7D7D',
    },
    warning: {
      main: purple[500],
    },
  },
});
