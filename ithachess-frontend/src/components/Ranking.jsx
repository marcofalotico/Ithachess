import React from 'react'
import PlayerList from '../components/PlayerList'

function Ranking({ players }) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Classifica Generale</h1>
      <PlayerList players={players} />
    </div>
  )
}

export default Ranking
