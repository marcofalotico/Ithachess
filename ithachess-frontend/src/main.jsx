import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// Redux
import { Provider } from 'react-redux'
import store from './store'

// Router
import { BrowserRouter } from 'react-router-dom'

// Stili Tailwind
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)