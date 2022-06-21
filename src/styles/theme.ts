import { createTheme } from '@material-ui/core/styles'
import styles from './export.module.scss'

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    darkGradient: Palette['primary']
    lightGradient: Palette['primary']
    body: Palette['primary']
  }
  interface PaletteOptions {
    darkGradient: PaletteOptions['primary']
    lightGradient: PaletteOptions['primary']
    body: PaletteOptions['primary']
  }
}

declare module '@material-ui/core/styles/createTransitions' {
  interface Transitions {
    defaultOpen: string
    defaultClose: string
  }
  interface TransitionsOptions {
    defaultOpen?: string
    defaultClose?: string
  }
}

export default createTheme({
  // Theme should go here. Mainly palette
  palette: {
    primary: {
      main: styles.primary,
      light: styles['primary-light'],
    },
    secondary: {
      main: styles['primary-light'],
    },
    body: {
      main: styles.body,
    },
    success: {
      main: styles.success,
    },
    error: {
      main: styles.error,
    },
    warning: {
      main: styles.warning,
    },
    darkGradient: {
      main: styles['dark-gradient'],
    },
    lightGradient: {
      main: styles['light-gradient'],
    },
  },
  typography: {
    fontFamily: ['Nunito Sans', 'Roboto'].join(','),
    h1: {
      fontSize: '3rem',
      padding: '1rem',
      color: 'rgba(0, 0, 0, 0.87)',
      opacity: 1,
      letterSpacing: '-0.0015em',
    },
    h2: {
      fontSize: '2.2rem',
      padding: '0.5rem',
    },
    h3: {
      fontSize: '1.8rem',
      padding: '0.5rem',
    },
  },
  transitions: {
    defaultOpen: '',
    defaultClose: '',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          letterSpacing: '1.25px',

          '&:hover': {
            boxShadow: 'none',
          },
        },
        containedPrimary: {
          '&:disabled': {
            opacity: 0.5,
            cursor: 'not-allowed',
          },
        },
        contained: {
          color: 'white',
        },
        disabled: {},
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '15px',
          backgroundColor: 'white',
          boxShadow: '0px 3px 6px #0000000D',
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          padding: '0',
        },
      },
    },
  },
})

export const verticalNavOpenWidth = 230
export const verticalNavClosedWidth = 46
