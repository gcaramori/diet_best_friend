import { extendTheme } from '@chakra-ui/react'

const config = {
  fonts: {
    heading: `'Poppins', 'sans-serif'`,
    body: `'Raleway', 'sans-serif'`
  },
  colors: {
    mainBlue: '#3742fa',
    mainWhite: '#dff9fb',
    mainRed: '#c0392b',
    mainGreen: '#27ae60'
  },
  breakpoints: {
    sm: '26em'
  }
}

const theme = extendTheme(config)

export default theme