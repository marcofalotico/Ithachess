import React from 'react'

// Il componente riceve la lista delle partite già aggiornata dal componente App
// Ogni volta che viene aggiornata (es. dopo una nuova partita), si ri-renderizza automaticamente

function MatchHistory({ matches }) {
  return (
    <div className="p-4 mt-8">
      <h2 className="text-xl font-bold mb-4 text-center">Storico Partite</h2>

      <div className="hidden md:block">
        {/* Vista desktop */}
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
                    : m.winner_id === m.white_id
                    ? '1 - 0'
                    : '0 - 1'}
                </td>
                <td className="p-2">{m.mode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vista mobile */}
      <div className="md:hidden space-y-4">
        {matches.map((m, i) => (
          <div key={i} className="border border-gray-300 bg-white p-4 rounded shadow-sm">
            <div><span className="font-semibold">Data:</span> {new Date(m.played_at).toLocaleString()}</div>
            <div><span className="font-semibold">Bianco:</span> {m.white_name}</div>
            <div><span className="font-semibold">Nero:</span> {m.black_name}</div>
            <div><span className="font-semibold">Risultato:</span> {
              m.result_type === 'draw'
                ? '½ - ½'
                : m.winner_id === m.white_id
                ? '1 - 0'
                : '0 - 1'
            }</div>
            <div><span className="font-semibold">Modalità:</span> {m.mode}</div>
          </div>
        ))}
      </div>
    </div>
  )
}


export default MatchHistory
