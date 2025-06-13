# 📘 Guida per imparare React con Ithachess

Questa guida spiega tutto quello che si è usato per creare l'app.

---

## 🔁 1. Cos'è React

React è una libreria JavaScript che permette di creare **interfacce utente dinamiche**.

In React tutto ruota intorno ai **componenti**.

---

## 🔧 2. useState – lo stato locale

```jsx
const [players, setPlayers] = useState([])
```

Ti permette di **memorizzare dati all'interno di un componente**. Ogni volta che aggiorni lo stato con `setPlayers(...)`, il componente si aggiorna.

---

## 🌍 3. useEffect – effetto collaterale

```jsx
useEffect(() => {
  fetch('/api/players')
    .then(res => res.json())
    .then(data => setPlayers(data))
}, [])
```

Serve per eseguire codice al caricamento del componente (ad es. recuperare dati).

---

## 📤 4. props – passaggio dati tra componenti

```jsx
function PlayerList({ players }) { ... }
```

Le `props` servono a **passare dati dal componente genitore (App) ai componenti figli (come PlayerList)**.

---

## 🧱 5. Struttura e responsabilità dei file

- **main.jsx**    → punto di ingresso. Qui si importa React, si collega lo store Redux e si importa `index.css`.
- **App.jsx**     → definisce tutte le rotte, gestisce fetch e funzioni principali, è il "cervello" dell'app.
- **componenti**  → oggetti riutilizzabili per layout e logica (es. MatchForm, PlayerList)
- **pagine**      → rappresentano le schermate principali (`/ranking`, `/form`, ecc.)

---

## 🔀 6. React Router – multipagina

```bash
npm install react-router-dom
```

Con React Router si possono usare più URL per mostrare pagine diverse:

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/form" element={<Form />} />
</Routes>
```

**Perché è utile:** permette di dividere l’interfaccia in pagine (routing), rendendo l'app ordinata.

---

## 🧠 7. Redux – stato globale

```bash
npm install @reduxjs/toolkit react-redux
```

Redux centralizza lo stato in un’unica fonte condivisa da tutta l’app. Non si usa più `useState` in App per i giocatori, ma:

```jsx
const players = useSelector(state => state.players.list)
```

e lo aggiorni tramite:

```js
dispatch(fetchPlayers())
```

**Differenza rispetto a useState**:
- `useState` → dati locali a un singolo componente
- `Redux` → dati accessibili da tutta l'app

---

## 🧠 Esempio finale

```jsx
// main.jsx
<Provider store={store}>
  <App />
</Provider>

// App.jsx
<Routes>
  <Route path="/" element={<Home players={players} />} />
</Routes>
```

---

## ✅ Best practices

- Un file = una responsabilità
- Index.css solo nel `main.jsx`
- App.jsx = centro di controllo e routing
- Redux = gestione centralizzata dei dati (giocatori)
- `useState` solo per dati locali (es. selezioni temporanee)
- Componenti piccoli e riutilizzabili