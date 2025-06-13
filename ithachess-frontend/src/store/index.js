// 📁 src/store/index.js

import { configureStore } from '@reduxjs/toolkit'
import playersReducer from './playersSlice'

// Creo lo store Redux con i "reducer" (qui solo players per ora)
const store = configureStore({
  reducer: {
    players: playersReducer
  }
})

export default store
