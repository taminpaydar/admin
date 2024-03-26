import {
    createTheme,
    PaletteColorOptions,
    ThemeProvider,
} from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface CustomPalette {
        gray: PaletteColorOptions;
        lightgray: PaletteColorOptions;
        lightergray: PaletteColorOptions;
        violet: PaletteColorOptions;
    }
    interface Palette extends CustomPalette { }
    interface PaletteOptions extends CustomPalette { }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        gray: true;
        lightgray: true;
        lightergray: true;
        violet: true;
    }
}

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: any) => augmentColor({ color: { main: mainColor } });
export const theme = createTheme({
    palette: {
        gray: createColor('#2C2C2C'),
        lightgray: createColor('#E7EAEC'),
        lightergray: createColor('#E7EAEC'),
        violet: createColor('#BC00A3'),
    },
});