// 📁 src/App.jsx

import React, { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPlayers } from './store/playersSlice'
import { fetchMatches } from './store/matchesSlice'
import Home from './pages/Home'
import Ranking from './pages/Ranking'
import MatchHistory from './pages/MatchHistory'
import Form from './pages/Form'
import HeadToHeadPage from './pages/HeadToHead'

function App() {
  const dispatch = useDispatch()

  const players = useSelector(state => state.players.list)
  const matches = useSelector(state => state.matches.list)

  useEffect(() => {
    dispatch(fetchPlayers())
    dispatch(fetchMatches())
  }, [dispatch])

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow p-4 flex gap-4">
        <Link to="/">🏠 Home</Link>
        <Link to="/ranking">📊 Classifica</Link>
        <Link to="/history">📜 Storico</Link>
        <Link to="/form">➕ Registra</Link>
        <Link to="/headtohead">⚔️ Confronta</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home players={players} matches={matches} />} />
        <Route path="/ranking" element={<Ranking players={players} />} />
        <Route path="/history" element={<MatchHistory matches={matches} />} />
        <Route path="/form" element={<Form players={players} />} />
        <Route path="/headtohead" element={<HeadToHeadPage players={players} />} />
      </Routes>
    </div>
  )
}

export default App
