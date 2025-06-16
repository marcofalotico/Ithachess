import React from 'react'
import { useSelector } from 'react-redux'
import MatchHistory from '../components/MatchHistory'

function MatchHistoryPage() {
  const matches = useSelector(state => state.matches.list)

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Storico Partite</h1>
      <MatchHistory matches={matches} />
    </div>
  )
}

export default MatchHistoryPage
