import React from 'react'
import Home from './pages/Home/Home'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import Movies from './pages/Movies/Movies'
import Favorites from './pages/Favorites/Favorites'
import MovieDetail from './pages/MovieDetail/MovieDetail'
import Trailer from './pages/Ranma/Ranma'
import RanmaDetail from './pages/Ranma/RanmaDetail';
import NotFound from './pages/NotFound/NotFound';


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/player/:id' element={<Player />} />
        <Route path='/movies' element={<Movies />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path='/movie/:id' element={<MovieDetail />} />
        <Route path="/ranma-detail" element={<RanmaDetail />} />
        <Route path='/trailer' element={<Trailer />} />
        <Route path="/tv-shows" element={<NotFound />} />
        <Route path="/new-popular" element={<NotFound />} />
        <Route path="/languages" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
