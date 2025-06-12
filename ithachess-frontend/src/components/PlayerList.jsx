import React from 'react'

// Riceve players come props dal componente App
function PlayerList({ players }) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-center">Classifica Generale</h2>
      <table className="w-full text-left border border-gray-300 bg-white">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">#</th>
            <th className="p-2">Nome</th>
            <th className="p-2">Elo</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={player.id} className="border-t">
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{player.name}</td>
              <td className="p-2">{player.elo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PlayerList
