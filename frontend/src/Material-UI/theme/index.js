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
    error: {
      main: '#B00020',
    },
  },
});

export default theme;
