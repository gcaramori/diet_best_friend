import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './index.css'
import theme from './lib/theme'
import '@fontsource/raleway'
import '@fontsource/poppins/600.css'
import AuthProvider from './contexts/AuthContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <GoogleOAuthProvider clientId="990577240690-0rk8l2262b07hrpuutfg5tuj55ag2clc.apps.googleusercontent.com">
        <AuthProvider>
          <App />
        </AuthProvider>
      </GoogleOAuthProvider>
    </ChakraProvider>
  </React.StrictMode>
)
