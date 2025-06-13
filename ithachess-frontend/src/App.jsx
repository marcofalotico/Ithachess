// 📁 src/App.jsx

import React, { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPlayers } from './store/playersSlice'
import Home from './pages/Home'
import Ranking from './pages/Ranking'
import MatchHistory from './pages/MatchHistory'
import Form from './pages/Form'
import HeadToHeadPage from './pages/HeadToHead'

function App() {
  const dispatch = useDispatch()

  // ✅ prende i giocatori da Redux
  const players = useSelector(state => state.players.list)

  // ✅ mantiene lo stato locale solo per i match
  const [matches, setMatches] = useState([])

  // 🔁 al primo render, carica dati da Redux e API
  useEffect(() => {
    dispatch(fetchPlayers())
    fetch('http://localhost:3001/api/matches')
      .then(res => res.json())
      .then(data => setMatches(data))
  }, [dispatch])

  // 🔁 aggiorna solo i match (i players li gestisce Redux)
  const refreshMatches = () => {
    fetch('http://localhost:3001/api/matches')
      .then(res => res.json())
      .then(data => setMatches(data))
  }

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
        <Route path="/form" element={<Form players={players} onMatchSaved={refreshMatches} />} />
        <Route path="/headtohead" element={<HeadToHeadPage players={players} />} />
      </Routes>
    </div>
  )
}

export default App
