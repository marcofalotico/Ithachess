import React from 'react'
import HeadToHead from '../components/HeadToHead'

function HeadToHeadPage({ players }) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Confronto Testa a Testa</h1>
      <HeadToHead players={players} />
    </div>
  )
}

export default HeadToHeadPage