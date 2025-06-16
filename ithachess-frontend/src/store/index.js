// 📁 src/store/index.js

import { configureStore } from '@reduxjs/toolkit'
import playersReducer from './playersSlice' // store dei giocatori
import matchesReducer from './matchesSlice' // store dei match

// Creo lo store Redux con i "reducer"
const store = configureStore({
  reducer: {
    players: playersReducer,
    matches: matchesReducer
  }
})

export default store
