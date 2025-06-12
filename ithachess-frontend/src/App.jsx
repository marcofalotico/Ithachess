// 📁 src/App.jsx
import React, { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import Home from './pages/Home' /* Home */
import Ranking from './pages/Ranking' /* Classifica */
import MatchHistory from './pages/MatchHistory' /* Storico */
import Form from './pages/Form' /* Registra */
import HeadToHeadPage from './pages/HeadToHead' /* Head to Head */

function App() {
  const [players, setPlayers] = useState([])       // ✅ Stato per la classifica
  const [matches, setMatches] = useState([])       // ✅ Stato per lo storico

  // Al primo render, carico dati da backend
  useEffect(() => {
    fetch('http://localhost:3001/api/players')
      .then(res => res.json())
      .then(data => setPlayers(data))

    fetch('http://localhost:3001/api/matches')
      .then(res => res.json())
      .then(data => setMatches(data))
  }, [])

  // Funzione per ricaricare classifica
  const refreshPlayers = () => {
    fetch('http://localhost:3001/api/players')
      .then(res => res.json())
      .then(data => setPlayers(data))
  }

  // Funzione per ricaricare storico
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
        <Route path="/form" element={<Form onMatchSaved={() => { refreshPlayers(); refreshMatches() }} players={players} refreshPlayers={refreshPlayers} />} />
        <Route path="/headtohead" element={<HeadToHeadPage players={players} />} />
      </Routes>
    </div>
  )
}

export default App
