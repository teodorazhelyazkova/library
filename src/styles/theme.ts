import { createTheme } from '@mui/material/styles';

export enum UiTheme {
    DARK = 'dark',
    LIGHT = 'light',
}

const mediaQueryMaxWidth = '@media (max-width:500px)';

const COMMON = {
    black: '#000',
    white: '#fff',
    red: '#F44336',
};

export const baseTheme = createTheme({
    shape: {
        borderRadius: 2,
    },
    components: {
        MuiButton: {
            defaultProps: {
                disableElevation: true,
            },
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    '& .hidden-buttons': {
                        display: 'none',
                    },
                    '&:hover .hidden-buttons': {
                        display: 'block',
                    },
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        borderBottom: `2px solid ${COMMON.red}`,
                    },
                },
            },
        },
    },
    typography: {
        h3: {
            fontWeight: 800,
            fontSize: '1.5rem',
            [mediaQueryMaxWidth]: {
                fontSize: '2rem',
            },
        },
        h4: {
            fontWeight: 'normal',
            [mediaQueryMaxWidth]: {
                fontSize: '1.5rem',
            },
        },
        h6: {
            fontWeight: 'normal',
            [mediaQueryMaxWidth]: {
                fontSize: '1rem',
            },
        },
    },
});
