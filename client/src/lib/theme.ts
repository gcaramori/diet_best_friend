import { extendTheme } from '@chakra-ui/react'

const config = {
  fonts: {
    main: `'Raleway', 'sans-serif'`,
  },
  breakpoints: {
    sm: '26em'
  }
}

const theme = extendTheme(config)

export default theme