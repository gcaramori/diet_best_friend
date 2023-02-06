import { useContext } from 'react';
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthContext, AuthContextType } from './contexts/AuthContext';

function App() {
  const { isAuthenticated } = useContext(AuthContext) as AuthContextType;

  const router = createBrowserRouter([
    {
      path: '/',
      element: (!isAuthenticated) ? <Login /> : <Home />
    },
    {
      path: '/register',
      element: <Register />
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
