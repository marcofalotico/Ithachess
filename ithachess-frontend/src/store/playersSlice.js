// 📁 src/store/playerSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// 🔁 Azione asincrona per caricare i giocatori dal backend
export const fetchPlayers = createAsyncThunk('players/fetchPlayers', async () => {
  const res = await fetch('http://localhost:3001/api/players')
  return await res.json()
})

const playersSlice = createSlice({
  name: 'players',
  initialState: {
    list: [],
    loading: false,
    error: null
  },
  reducers: {
    // Aggiunta locale di un giocatore (opzionale)
    addPlayer(state, action) {
      state.list.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlayers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPlayers.fulfilled, (state, action) => {
        state.list = action.payload
        state.loading = false
      })
      .addCase(fetchPlayers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export const { addPlayer } = playersSlice.actions
export default playersSlice.reducer
