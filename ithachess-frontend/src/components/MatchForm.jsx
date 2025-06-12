import React, { useState } from 'react'

// Questo componente riceve:
// - players: la lista dei giocatori (passata da App)
// - onMatchSaved: funzione da chiamare per aggiornare la classifica dopo ogni partita

function MatchForm({ players, onMatchSaved }) {
  const [whiteId, setWhiteId] = useState('')
  const [blackId, setBlackId] = useState('')
  const [winner, setWinner] = useState('')
  const [mode, setMode] = useState('blitz')

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

    fetch('http://localhost:3001/api/matches', {
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
        if (onMatchSaved) onMatchSaved()  // 🔁 aggiorna classifica
      })
      .catch(err => console.error('Errore POST /matches:', err))
  }

  return (
    <form className="bg-white p-4 rounded shadow mt-8" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-4">Registra nuova partita</h2>

      <div className="mb-2">
        <label>Bianco:</label>
        <select value={whiteId} onChange={e => setWhiteId(e.target.value)} className="ml-2 p-1">
          <option value="">-- seleziona --</option>
          {players.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      <div className="mb-2">
        <label>Nero:</label>
        <select value={blackId} onChange={e => setBlackId(e.target.value)} className="ml-2 p-1">
          <option value="">-- seleziona --</option>
          {players.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
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
  )
}

export default MatchForm
