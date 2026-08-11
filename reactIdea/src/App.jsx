import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import NavBar from './components/NavBar.jsx'
import IdeaDetail from './pages/IdeaDetail.jsx'
import CreateIdea from './pages/CreateIdea.jsx'

function App() {
    const location = useLocation();
  const hideNavbarPaths = ['/login', '/register'];
  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);
  return (
    <>
      {shouldShowNavbar && <NavBar />}
  <Routes>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/home' element={<Home/>}></Route>
    <Route path='/register' element={<Register/>}></Route>
    <Route path='/ideas/:id' element={<IdeaDetail/>}></Route>
    <Route path='/ideas/create' element={<CreateIdea/>}></Route>
  </Routes>
  </>
  )
}

export default App
