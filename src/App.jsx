import React from 'react'
import Home from './pages/Home/Home'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import Movies from './pages/Movies/Movies'
import Favorites from './pages/Favorites/Favorites'
import MovieDetail from './pages/MovieDetail/MovieDetail'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/player/:id' element={<Player/>}/>
        <Route path='/movies' element={<Movies/>}/>
        <Route path="/favorites" element={<Favorites />} />
        <Route path='/movie/:id' element={<MovieDetail/>}/>
      </Routes>
      
    </div>
  )
}

export default App
