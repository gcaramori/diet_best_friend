import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './index.css'
import theme from './lib/theme'
import '@fontsource/raleway/400.css'
import '@fontsource/raleway/700.css'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/700.css'
import AuthProvider from './contexts/AuthContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="990577240690-0rk8l2262b07hrpuutfg5tuj55ag2clc.apps.googleusercontent.com">
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
)
