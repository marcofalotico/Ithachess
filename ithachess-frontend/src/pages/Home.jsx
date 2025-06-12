import React from 'react'
import Dashboard from '../components/Dashboard'

function Home({ players, matches }) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Benvenuto su Ithachess</h1>
      <Dashboard players={players} matches={matches} />
    </div>
  )
}

export default Home
