import React from 'react'
import MatchForm from '../components/MatchForm'

function Form({ onMatchSaved, players }) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Registra Partita</h1>
      <MatchForm onMatchSaved={onMatchSaved} players={players} />
    </div>
  )
}

export default Form