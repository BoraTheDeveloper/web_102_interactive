import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { syncClock } from './lib/clock.js'
import './styles.css'

// Mount only after the clock has settled, so the gate is never evaluated
// against an unsynced device clock and no locked week flashes open. A warm
// same-origin HEAD is 20-80ms; syncClock resolves within 2.5s even if it hangs.
syncClock().finally(() => {
  createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
})
