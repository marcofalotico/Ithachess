# 🧠 Progetto Ithachess - Guida completa

Questa guida contiene tutti i passaggi eseguiti finora per creare il progetto **Ithachess**: una piattaforma per tracciare partite di scacchi dal vivo in ufficio, con punteggi Elo aggiornabili.

---

## 📁 1. Creazione del database SQLite

### Struttura tabelle:

```sql
CREATE TABLE players (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  elo INTEGER DEFAULT 400,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE matches (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  white_id INTEGER NOT NULL,
  black_id INTEGER NOT NULL,
  winner_id INTEGER,
  mode TEXT CHECK(mode IN ('blitz', 'rapid')) NOT NULL,
  played_at TEXT,
  result_type TEXT CHECK(result_type IN ('win', 'loss', 'draw', 'stalemate')),
  FOREIGN KEY (white_id) REFERENCES players(id),
  FOREIGN KEY (black_id) REFERENCES players(id),
  FOREIGN KEY (winner_id) REFERENCES players(id)
);
```

### Programma utilizzato:

- **[DB Browser for SQLite](https://sqlitebrowser.org/dl/)** (gratuito e multipiattaforma)

---

## ⚛️ 2. Creazione frontend con React + Vite + Tailwind

### Installazione base

```bash
npm create vite@latest ithachess-frontend -- --template react
cd ithachess-frontend
```

### Dipendenze

```bash
npm install
npm install -D tailwindcss postcss autoprefixer
npm install -D @tailwindcss/postcss // TailwindCSS v4 che fa finalmente funzionare tailwindcss

```

### Configurazioni essenziali

- `tailwind.config.js`, `postcss.config.js` e `src/index.css` correttamente configurati.
- `import './index.css'` inserito in `main.jsx`

---

## ⚙️ Librerie installate

```bash
npm install react-router-dom
npm install @reduxjs/toolkit react-redux
```

---

## 📦 Struttura progetto React

```
src/
├── App.jsx                   # Componente principale con routing e stato globale
├── main.jsx                  # Entry point dell’app, monta React e Redux Provider
├── index.css                 # Stili TailwindCSS
├── store/
│   ├── index.js              # Configurazione dello store Redux
│   └── playersSlice.js       # Slice Redux per i giocatori
├── components/
│   ├── MatchForm.jsx         # Form per registrare partite e giocatori
│   ├── PlayerList.jsx        # Tabella classifica generale
│   └── HeadToHeadChart.jsx   # Grafico a torta con Recharts
├── pages/
│   ├── Home.jsx              # Dashboard con ultimi match e top player
│   ├── Ranking.jsx           # Pagina classifica
│   ├── MatchHistory.jsx      # Pagina storico
│   ├── Form.jsx              # Pagina form
│   └── HeadToHead.jsx        # Pagina confronto testa a testa
```

---

## 🌐 Backend Express + SQLite

API disponibili:

- `GET /api/players`    → classifica
- `POST /api/players`   → aggiunta giocatore
- `GET /api/matches`    → storico partite
- `POST /api/matches`   → registra nuova partita
- `GET /api/headtohead` → confronto tra due giocatori

---

## ✅ Funzionalità implementate

- Routing a più pagine con React Router
- Stato centralizzato Redux per la classifica
- Aggiornamento in tempo reale della UI
- Dashboard riassuntiva
- Grafico a torta in confronto testa a testa