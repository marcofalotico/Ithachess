// 📁 src/store/playerSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const API_URL = import.meta.env.VITE_API_BASE_URL

// 🔁 Azione asincrona per caricare i giocatori dal backend
export const fetchPlayers = createAsyncThunk('players/fetchPlayers', async () => {
  const res = await fetch(`${API_URL}/players`)
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
