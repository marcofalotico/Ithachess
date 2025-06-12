
# 🧠 Progetto Ithachess - Guida completa

Questa guida contiene tutti i passaggi eseguiti finora per creare il progetto **Ithachess**: una piattaforma per tracciare partite di scacchi tra colleghi, con punteggi Elo aggiornabili.

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

### Operazioni:
- Creazione database `ithachess.db`
- Inserimento dati via interfaccia o via SQL (`Execute SQL`)
- Aggiunta colonna `result_type` per gestire i tipi di risultato
- Rimozione del `DEFAULT CURRENT_TIMESTAMP` e gestione manuale dell'orario via backend

---

## ⚛️ 2. Creazione del frontend con React + Vite + Tailwind

### 📦 Installazione del progetto

```bash
npm create vite@latest ithachess-frontend -- --template react
cd ithachess-frontend
```

> oppure usa il pacchetto ZIP già configurato se fornito

### 📁 Struttura base creata:

- `/src/App.jsx`
- `/src/main.jsx`
- `/src/index.css`
- `index.html`
- `tailwind.config.js`
- `vite.config.js`
- `package.json`

---

### 🌀 Installazione delle dipendenze

```bash
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

> ⚠️ Se `tailwind` non funziona, assicurati che sia nella `devDependencies`.

---

### ⚙️ Configura Tailwind

Nel file `tailwind.config.js`:

```js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Nel file `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Nel file `postcss.config.js`:

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

---

### 🚀 Avvia il progetto

```bash
npm run dev
```

Apri il browser su [http://localhost:5173](http://localhost:5173)

---

## 🌐 Backend Express + SQLite

- `GET /api/players` → restituisce la classifica ordinata
- `POST /api/matches` → registra partita, aggiorna elo, salva orario
- `GET /api/matches` → restituisce lo storico partite (con nomi)
- `GET /api/headtohead` → confronto tra due giocatori

---

## 🧠 Funzionalità implementate

- Inserimento partite con React + form controllato
- Calcolo Elo dinamico lato backend (K = 32/16)
- Classifica aggiornata automaticamente dopo ogni partita
- Storico aggiornato automaticamente dopo ogni partita
- Confronto testa a testa tra due giocatori

---
