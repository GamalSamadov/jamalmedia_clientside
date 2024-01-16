import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from "@mui/material/styles"
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import GuestPage from 'scenes/guestPage'
import HomePage from 'scenes/homePage'
import LoginPage from 'scenes/loginPage'
import ProfilePage from 'scenes/profilePage'
import { themeSettings } from './theme'


function App() {

  const mode = useSelector((state) => state.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode), [ mode ]))
  const isAuth = Boolean(useSelector((state) => state.token))


  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline /> 
          <Routes>
            <Route path="/" element={!isAuth ? <LoginPage /> : <Navigate to="/home" />}></Route>
            <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/" />}></Route>
            <Route path="/guest" element={!isAuth ? <GuestPage /> : <Navigate to="/home" />}></Route>
            {/* <Route path="/guest" element={<GuestPage /> }></Route> */}
            <Route path="/profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to="/" />}></Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
