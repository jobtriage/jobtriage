import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
  },
  palette: {
    primary: {
      main: '#794BC4',
    },
    secondary: {
      main: '#03DAC6',
    },
    textPrimary: {
      main: 'rgba(0, 0, 0, 0.87)',
    },
    textSecondary: {
      main: 'rgba(0, 0, 0, 0.57)',
    },
    activeBg: {
      main: '#d8d8d8',
    },
    error: {
      main: '#b00020',
    },
  },
});

export default theme;
