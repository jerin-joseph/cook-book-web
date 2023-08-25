import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/Signup'
import PrimarySearchAppBar  from './components/AppBar'
import SignIn from './pages/Signin';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {

  const defaultTheme = createTheme({
    palette: {
        mode: 'dark',
      },
});

  return (
    <div className='App'>
      <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
      <PrimarySearchAppBar/>
      <Routes>
        <Route path="/" element={<SignIn/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/home" element={<Home/>} />
      </Routes>
      </BrowserRouter>
      </ThemeProvider>
    </div>
  )
}

export default App
