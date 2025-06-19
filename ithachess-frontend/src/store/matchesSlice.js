// 📁 src/store/matchesSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const API_URL = import.meta.env.VITE_API_BASE_URL

// 🔁 Azione asincrona per fetch dei match
export const fetchMatches = createAsyncThunk('matches/fetchMatches', async () => {
  const res = await fetch(`${API_URL}matches`)
  if (!res.ok) throw new Error('Errore durante il fetch delle partite')
  return await res.json()
})

const matchesSlice = createSlice({
  name: 'matches',
  initialState: {
    list: [],
    loading: false,
    error: null
  },
  reducers: {
    // eventualmente si possono aggiungere metodi come addMatch se si usa optimistic updates
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatches.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMatches.fulfilled, (state, action) => {
        state.list = action.payload
        state.loading = false
      })
      .addCase(fetchMatches.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export default matchesSlice.reducer
