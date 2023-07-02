import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import 'react-mde/lib/styles/css/react-mde-all.css';
import PlaySound from './sounds.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <PlaySound/>
  </React.StrictMode>,
)
