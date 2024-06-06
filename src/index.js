import React from 'react'
import ReactDOM from 'react-dom/client'
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './index.css'
// import { Login } from './Pages/Login.js'
// import { Dashboard } from './Pages/Dashboard.js'
// import { Calendar } from './Pages/Calendar.js'
// import { FormsPage } from './Pages/Forms.js'
import { App } from './App.js';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
