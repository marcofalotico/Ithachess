// 📁 src/components/HeadToHeadChart.jsx
import React from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Definiamo i colori da usare nel grafico
const COLORS = ['#4ade80', '#f87171', '#facc15'] // verde = A, rosso = B, giallo = pareggi

// Componente che mostra un grafico a torta con le statistiche tra due giocatori
function HeadToHeadChart({ playerA, playerB, matches }) {
  // Calcoliamo i risultati
  const stats = {
    A: 0, // vittorie playerA
    B: 0, // vittorie playerB
    draw: 0 // pareggi
  }

  matches.forEach(match => {
    const isAwhite = match.white_name === playerA
    const isBwhite = match.white_name === playerB

    if (match.result_type === 'draw') {
      stats.draw++
    } else if (match.winner_id === match.white_id) {
      // Vince il bianco
      if (isAwhite) stats.A++
      if (isBwhite) stats.B++
    } else {
      // Vince il nero
      if (!isAwhite && match.white_name === playerB) stats.A++
      if (!isBwhite && match.white_name === playerA) stats.B++
    }
  })

  const data = [
    { name: playerA, value: stats.A },
    { name: playerB, value: stats.B },
    { name: 'Pareggi', value: stats.draw },
  ]

  return (
    <div className="w-full h-64">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default HeadToHeadChart
