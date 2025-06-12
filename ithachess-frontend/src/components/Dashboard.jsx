// 📁 src/components/Dashboard.jsx
import React from 'react'

// Questo componente riceve due props: la lista dei giocatori e lo storico delle partite
function Dashboard({ players, matches }) {
  // Selezioniamo i primi 3 giocatori per la mini-classifica
  const topPlayers = players.slice(0, 3)

  // Selezioniamo le ultime 3 partite giocate
  const latestMatches = matches.slice(0, 3)

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Mini-classifica */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-bold mb-2">🏆 Top 3 Giocatori</h2>
        <table className="w-full text-left border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">#</th>
              <th className="p-2">Nome</th>
              <th className="p-2">Elo</th>
            </tr>
          </thead>
          <tbody>
            {topPlayers.map((player, index) => (
              <tr key={player.id} className="border-t">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{player.name}</td>
                <td className="p-2">{player.elo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Ultime partite */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-bold mb-2">📜 Ultime 3 Partite</h2>
        <table className="w-full text-left border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Bianco</th>
              <th className="p-2">Nero</th>
              <th className="p-2">Risultato</th>
            </tr>
          </thead>
          <tbody>
            {latestMatches.map(match => (
              <tr key={match.id} className="border-t">
                <td className="p-2">{match.white_name}</td>
                <td className="p-2">{match.black_name}</td>
                <td className="p-2">
                  {match.result_type === 'draw'
                    ? '½ – ½'
                    : match.winner_id === match.white_id
                    ? '1 – 0'
                    : '0 – 1'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Dashboard
