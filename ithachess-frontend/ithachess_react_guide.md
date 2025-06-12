# 📘 Guida per imparare React con Ithachess

Questa guida è pensata per imparare React partendo dal progetto Ithachess, costruito passo dopo passo.

---

## 🔁 1. Cos'è React

React è una **libreria JavaScript** per costruire interfacce utente. Permette di creare **componenti riutilizzabili** che si aggiornano automaticamente quando cambiano i dati.

---

## 🔧 2. useState – lo stato

```js
const [players, setPlayers] = useState([])
```

`useState` serve per **salvare dati temporanei** in un componente (ad esempio, la lista dei giocatori).

- `players` è il valore
- `setPlayers` è la funzione che lo aggiorna

Quando chiami `setPlayers(...)`, React **ri-renderizza il componente** con i nuovi dati.

---

## 🌍 3. useEffect – effetto collaterale

```js
useEffect(() => {
  fetch('/api/players')
    .then(res => res.json())
    .then(data => setPlayers(data))
}, [])
```

`useEffect` serve per **eseguire codice una volta** (es. caricamento dati da backend).

- Il secondo parametro `[]` dice “esegui solo al primo caricamento”.
- Se metti `[qualcosa]`, lo esegue ogni volta che “qualcosa” cambia.

---

## 📤 4. props – dati da padre a figlio

```js
function PlayerList({ players }) { ... }
```

Le `props` sono il modo in cui **un componente genitore passa dati ai figli**.

Nel nostro caso:
- `App` gestisce i dati globali
- Li passa a `PlayerList`, `MatchForm`, `MatchHistory`

---

## 🧩 5. Com'è strutturata l'app

- `App.jsx` → gestisce lo stato globale (`players`, `matches`) e aggiorna tutto
- `PlayerList.jsx` → mostra la classifica ordinata
- `MatchHistory.jsx` → mostra lo storico delle partite
- `MatchForm.jsx` → permette di registrare una nuova partita
- `HeadToHead.jsx` → permette di selezionare due giocatori e confrontarli

---

## 📬 6. Aggiornamento automatico

Ogni volta che salvi una nuova partita:
- React chiama `onMatchSaved()` dal `MatchForm`
- Questa funzione aggiorna sia la classifica (`refreshPlayers`) che lo storico (`refreshMatches`)
- Entrambi vengono aggiornati in tempo reale grazie a `useState` + `props`

---

## 🌍 7. React Router

React Router ti permette di creare una **Single Page Application con più pagine virtuali**.

### Installazione

```bash
npm install react-router-dom
```

### Esempio di routing:

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/ranking" element={<Ranking players={players} />} />
</Routes>
```

### Cosa cambia?

- I componenti non vengono più mostrati tutti nella stessa pagina
- Ogni “pagina” ha un suo path (`/ranking`, `/form`, `/headtohead`)
- La navigazione è più ordinata e modulare

---

## ✅ Best practice React

- Stato globale in `App` = più controllo
- Niente `fetch` dentro i componenti se puoi usare `props`
- `useEffect` solo dove serve
- Separazione logica in file `.jsx` leggibili e riutilizzabili
- Usa `react-router-dom` per gestire più viste nel progetto

---