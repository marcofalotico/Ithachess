import React, { useState, useEffect } from 'react'
import HeadToHeadChart from '../components/HeadToHeadChart'

const API_URL = import.meta.env.VITE_API_BASE_URL


function HeadToHead({ players }) {
  const [p1, setP1] = useState('')
  const [p2, setP2] = useState('')
  const [matches, setMatches] = useState([])

  useEffect(() => {
    if (p1 && p2 && p1 !== p2) {
      fetch(`${API_URL}/headtohead?p1=${p1}&p2=${p2}`)
        .then(res => res.json())
        .then(data => setMatches(data))
        .catch(err => console.error('Errore H2H:', err))
    }
  }, [p1, p2])

  const stats = {
    [p1]: 0,
    [p2]: 0,
    draws: 0
  }

  matches.forEach(m => {
    if (m.result_type === 'draw') {
      stats.draws++
    } else if (m.winner_id == p1) {
      stats[p1]++
    } else if (m.winner_id == p2) {
      stats[p2]++
    }
  })

  const name1 = players.find(p => p.id == p1)?.name || ''
  const name2 = players.find(p => p.id == p2)?.name || ''


  return (
    <div className="p-4 mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">Testa a Testa</h2>

      <div className="flex gap-4 justify-center mb-4">
        <select value={p1} onChange={e => setP1(e.target.value)} className="p-1">
          <option value="">Giocatore 1</option>
          {players.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        <select value={p2} onChange={e => setP2(e.target.value)} className="p-1">
          <option value="">Giocatore 2</option>
          {players.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      {p1 && p2 && matches.length > 0 && (
        <HeadToHeadChart playerA={name1} playerB={name2} matches={matches} />
      )}


      {/* Statistiche + tabella */}
      {matches.length > 0 ? (
        <>
          <div className="text-center mb-4">
            <p>🎯 Totale partite: <strong>{matches.length}</strong></p>
            <p>🏁 Vittorie {name1}: <strong>{stats[p1]}</strong></p>
            <p>🏁 Vittorie {name2}: <strong>{stats[p2]}</strong></p>
            <p>🤝 Patte: <strong>{stats.draws}</strong></p>
          </div>

          <div className="flex flex-col gap-4">
            {matches.map((m, i) => (
              <div key={i} className="bg-white border rounded shadow p-4 text-sm">
                <p><strong>Data:</strong> {new Date(m.played_at).toLocaleString()}</p>
                <p><strong>Bianco:</strong> {m.white_name}</p>
                <p><strong>Nero:</strong> {m.black_name}</p>
                <p><strong>Risultato:</strong> {
                  m.result_type === 'draw'
                    ? '½ - ½'
                    : m.winner_id === m.white_id ? '1 - 0' : '0 - 1'
                }</p>
                <p><strong>Modalità:</strong> {m.mode}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        p1 && p2 && p1 !== p2 && (
          <div className="text-center mt-6 text-yellow-700 bg-yellow-100 border border-yellow-300 rounded p-4">
            Nessuna partita tra i giocatori selezionati
          </div>
        )
      )}
    </div>
  )
}

export default HeadToHead
