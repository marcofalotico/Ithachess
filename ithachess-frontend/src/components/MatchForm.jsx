// 📁 src/components/MatchForm.jsx

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchPlayers } from '../store/playersSlice'
import { fetchMatches } from '../store/matchesSlice'

const API_URL = import.meta.env.VITE_API_BASE_URL

// ✅ Aggiungiamo anche `refreshPlayers` come prop
function MatchForm({ players, onMatchSaved, refreshPlayers }) {
  const [whiteId, setWhiteId] = useState('')
  const [blackId, setBlackId] = useState('')
  const [winner, setWinner] = useState('')
  const [mode, setMode] = useState('blitz')
  const [newPlayerName, setNewPlayerName] = useState('')

  const dispatch = useDispatch()


  // 🟢 Funzione che salva una nuova partita
  const handleSubmit = (e) => {
    e.preventDefault()

    const resultType = winner === 'draw' ? 'draw' : 'win'
    const winnerId = winner === 'draw' ? null : parseInt(winner)

    const body = {
      white_id: parseInt(whiteId),
      black_id: parseInt(blackId),
      winner_id: winnerId,
      mode,
      result_type: resultType,
    }

    fetch('${API_URL}matches', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(res => {
        if (!res.ok) throw new Error(`Errore HTTP: ${res.status}`)
        return res.json()
      })
      .then(() => {
        alert('Partita registrata!')
        dispatch(fetchPlayers()) // 🔁 aggiorna Redux e dunque la classifica in tempo reale
        dispatch(fetchMatches()) // 🔁 aggiorna la lista delle partite
      })
      .catch(err => console.error('Errore POST /matches:', err))
  }

  // 🟢 Funzione che salva un nuovo giocatore
  const handleAddPlayer = (e) => {
    e.preventDefault()
    if (!newPlayerName.trim()) return

    fetch('${API_URL}players', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newPlayerName })
    })
      .then(res => {
        if (!res.ok) throw new Error(`Errore HTTP: ${res.status}`)
        return res.json()
      })
      .then(() => {
        alert('Giocatore aggiunto!')
        setNewPlayerName('')
        dispatch(fetchPlayers()) // 🔁 aggiorna Redux
        dispatch(fetchMatches()) // 🔁 aggiorna la lista delle partite
      })
      .catch(err => console.error(err))
  }

  return (
    <div className="bg-white p-4 rounded shadow mt-8 space-y-8">
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold mb-4">Registra nuova partita</h2>

        <div className="mb-2">
          <label>Bianco:</label>
          <select value={whiteId} onChange={e => setWhiteId(e.target.value)} className="ml-2 p-1">
            <option value="">-- seleziona --</option>
            {players.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>

        <div className="mb-2">
          <label>Nero:</label>
          <select value={blackId} onChange={e => setBlackId(e.target.value)} className="ml-2 p-1">
            <option value="">-- seleziona --</option>
            {players.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>

        <div className="mb-2">
          <label>Risultato:</label>
          <select value={winner} onChange={e => setWinner(e.target.value)} className="ml-2 p-1">
            <option value="">-- seleziona --</option>
            <option value={whiteId}>Vittoria Bianco</option>
            <option value={blackId}>Vittoria Nero</option>
            <option value="draw">Pareggio</option>
          </select>
        </div>

        <div className="mb-4">
          <label>Modalità:</label>
          <select value={mode} onChange={e => setMode(e.target.value)} className="ml-2 p-1">
            <option value="blitz">Blitz</option>
            <option value="rapid">Rapid</option>
          </select>
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Registra Partita
        </button>
      </form>

      <form onSubmit={handleAddPlayer} className="border-t pt-6">
        <h2 className="text-xl font-semibold mb-4">Registra nuovo giocatore</h2>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={newPlayerName}
            onChange={e => setNewPlayerName(e.target.value)}
            placeholder="Nome giocatore"
            className="p-2 border rounded w-full"
          />
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Aggiungi
          </button>
        </div>
      </form>
    </div>
  )
}

export default MatchForm
