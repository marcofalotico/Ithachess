const express = require('express')
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose()
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// Percorso al file .db
const dbPath = path.join(__dirname, 'ithachess.db')
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) return console.error(err.message)

  // Se il DB è nuovo, crea le tabelle
  db.run(`CREATE TABLE IF NOT EXISTS players (...)`)
  db.run(`CREATE TABLE IF NOT EXISTS matches (...)`)
})

// 🔹 Aggiunta giocatore
app.post('/api/players', (req, res) => {
  const { name } = req.body
  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'Nome mancante o non valido' })
  }

  const sql = `INSERT INTO players (name, elo) VALUES (?, 400)`
  db.run(sql, [name.trim()], function (err) {
    if (err) {
      console.error('❌ Errore inserimento giocatore:', err.message)
      return res.status(500).json({ error: 'Errore nel salvataggio del giocatore' })
    }

    console.log(`✅ Aggiunto nuovo giocatore con ID ${this.lastID}`)
    res.json({ id: this.lastID, name, elo: 400 })
  })
})

// 🔹 Classifica
app.get('/api/players', (req, res) => {
  db.all(`SELECT id, name, elo FROM players ORDER BY elo DESC`, [], (err, rows) => {
    if (err) {
      console.error('Errore DB /api/players:', err.message)
      return res.status(500).json({ error: err.message })
    }
    res.json(rows)
  })
})

// 🔹 Elenco delle partite
app.get('/api/matches', (req, res) => {
  const sql = `
    SELECT 
      m.*, 
      pw.name AS white_name, 
      pb.name AS black_name 
    FROM matches m
    JOIN players pw ON m.white_id = pw.id
    JOIN players pb ON m.black_id = pb.id
    ORDER BY m.played_at DESC
  `
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Errore fetch matches:', err.message)
      return res.status(500).json({ error: err.message })
    }
    res.json(rows)
  })
})

// 🔹 Confronto giocatori
app.get('/api/headtohead', (req, res) => {
  const { p1, p2 } = req.query
  if (!p1 || !p2) return res.status(400).json({ error: 'Player IDs mancanti' })

  const sql = `
    SELECT m.*, pw.name AS white_name, pb.name AS black_name
    FROM matches m
    JOIN players pw ON m.white_id = pw.id
    JOIN players pb ON m.black_id = pb.id
    WHERE (white_id = ? AND black_id = ?) OR (white_id = ? AND black_id = ?)
    ORDER BY played_at DESC
  `
  db.all(sql, [p1, p2, p2, p1], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(rows)
  })
})


// 🔹 Inserimento partita
app.post('/api/matches', (req, res) => {
  const { white_id, black_id, winner_id, mode, result_type } = req.body

  console.log('📩 Ricevuta richiesta POST /api/matches')
  console.log({ white_id, black_id, winner_id, mode, result_type })

  if (!white_id || !black_id || !mode || !result_type) {
    return res.status(400).json({ error: 'Dati mancanti o non validi' })
  }

  const getPlayersSql = `SELECT id, elo FROM players WHERE id IN (?, ?)`
  db.all(getPlayersSql, [white_id, black_id], (err, players) => {
    if (err) {
      console.error('Errore lettura giocatori:', err.message)
      return res.status(500).json({ error: err.message })
    }

    if (players.length !== 2) {
      return res.status(404).json({ error: 'Giocatori non trovati nel DB' })
    }

    const white = players.find(p => p.id === white_id)
    const black = players.find(p => p.id === black_id)

    if (!white || !black) {
      return res.status(404).json({ error: 'Giocatore mancante' })
    }

    const eloWhite = white.elo
    const eloBlack = black.elo
    const K = mode === 'rapid' ? 16 : 32

    const expectedWhite = 1 / (1 + Math.pow(10, (eloBlack - eloWhite) / 400))
    const expectedBlack = 1 / (1 + Math.pow(10, (eloWhite - eloBlack) / 400))

    let scoreWhite = 0.5
    let scoreBlack = 0.5

    if (winner_id === white_id) {
      scoreWhite = 1
      scoreBlack = 0
    } else if (winner_id === black_id) {
      scoreWhite = 0
      scoreBlack = 1
    }

    const newEloWhite = Math.round(eloWhite + K * (scoreWhite - expectedWhite))
    const newEloBlack = Math.round(eloBlack + K * (scoreBlack - expectedBlack))

    const now = new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 19)
    .replace('T', ' ')

    const insertSql = `
        INSERT INTO matches (white_id, black_id, winner_id, mode, result_type, played_at)
        VALUES (?, ?, ?, ?, ?, ?)
    `
    console.log('🕒 Inserisco partita con valori:')
    console.log({ white_id, black_id, winner_id, mode, result_type, played_at: now })

    db.run(insertSql, [white_id, black_id, winner_id, mode, result_type, now], function (err) {
        if (err) {
            console.error('❌ Errore inserimento match:', err.message)
            return res.status(500).json({ error: 'Errore inserimento match' })
        }

      db.run(`UPDATE players SET elo = ? WHERE id = ?`, [newEloWhite, white_id], (err1) => {
        if (err1) {
          console.error('❌ Errore update bianco:', err1.message)
          return res.status(500).json({ error: 'Errore update bianco' })
        }

        db.run(`UPDATE players SET elo = ? WHERE id = ?`, [newEloBlack, black_id], (err2) => {
          if (err2) {
            console.error('❌ Errore update nero:', err2.message)
            return res.status(500).json({ error: 'Errore update nero' })
          }

          console.log('✅ Partita registrata con successo')
          res.json({ success: true, newEloWhite, newEloBlack })
        })
      })
    })
  })
})

// ▶️ Avvio server
app.listen(PORT, () => {
  console.log(`✅ Backend avviato su http://localhost:${PORT}`)
})
