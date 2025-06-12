// 📁 src/App.jsx

import React, { useEffect, useState } from 'react'
import PlayerList from './components/PlayerList'
import MatchForm from './components/MatchForm'
import MatchHistory from './components/MatchHistory'
import HeadToHead from './components/HeadToHead'




// Questo è il componente principale della nostra app React.
// React utilizza JSX: sembra HTML, ma in realtà è JavaScript.
// Il componente App verrà montato nella div con id="root" del file index.html.

function App() {

  // Funzione per caricare la classifica aggiornata
  const [players, setPlayers] = useState([])
  const refreshPlayers = () => {
    fetch('http://localhost:3001/api/players')
      .then(res => res.json())
      .then(data => setPlayers(data))
      .catch(err => console.error('Errore fetch players:', err))
  }

  // Carico i giocatori al primo avvio
  useEffect(() => {
    refreshPlayers()
  }, [])

  const [matches, setMatches] = useState([])

  const refreshMatches = () => {
    fetch('http://localhost:3001/api/matches')
      .then(res => res.json())
      .then(data => setMatches(data))
  }

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Ithachess ♟️</h1>
      <PlayerList players={players} />
      <MatchForm onMatchSaved={() => {
        refreshPlayers()
        refreshMatches()
      }} players={players} />
      <MatchHistory matches={matches} />
      <HeadToHead players={players} />


    </div>
  )
}

export default App
