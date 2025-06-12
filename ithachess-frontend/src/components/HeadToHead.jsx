import React, { useState, useEffect } from 'react'
import HeadToHeadChart from '../components/HeadToHeadChart'


function HeadToHead({ players }) {
  const [p1, setP1] = useState('')
  const [p2, setP2] = useState('')
  const [matches, setMatches] = useState([])

  useEffect(() => {
    if (p1 && p2 && p1 !== p2) {
      fetch(`http://localhost:3001/api/headtohead?p1=${p1}&p2=${p2}`)
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
      {matches.length > 0 && (
        <>
          <div className="text-center mb-4">
            <p>🎯 Totale partite: <strong>{matches.length}</strong></p>
            <p>🏁 Vittorie {players.find(p => p.id == p1)?.name}: <strong>{stats[p1]}</strong></p>
            <p>🏁 Vittorie {players.find(p => p.id == p2)?.name}: <strong>{stats[p2]}</strong></p>
            <p>🤝 Patte: <strong>{stats.draws}</strong></p>
          </div>
          <table className="w-full text-left border border-gray-300 bg-white text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2">Data</th>
                <th className="p-2">Bianco</th>
                <th className="p-2">Nero</th>
                <th className="p-2">Risultato</th>
                <th className="p-2">Modalità</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((m, i) => (
                <tr key={i} className="border-t">
                  <td className="p-2">{new Date(m.played_at).toLocaleString()}</td>
                  <td className="p-2">{m.white_name}</td>
                  <td className="p-2">{m.black_name}</td>
                  <td className="p-2">
                    {m.result_type === 'draw'
                      ? '½ - ½'
                      : m.winner_id === m.white_id ? '1 - 0' : '0 - 1'}
                  </td>
                  <td className="p-2">{m.mode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  )
}

export default HeadToHead
