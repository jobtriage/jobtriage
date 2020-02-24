import { createMuiTheme } from '../import';

const theme = createMuiTheme({
    typography: {
        fontFamily: ['Montserrat', 'sans-serif'].join(','),
    },
    palette: {
        primary: {
            main: '#956eb7',
        },
        secondary: {
            main: '#03DAC6',
        },
        error: {
            main: '#B00020',
        },
    },
});
export { theme };