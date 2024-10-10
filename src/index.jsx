import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';

// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './index.css'
// import { App } from './App.js';
import { CEFApp } from './CEFApp.jsx';
import { Provider } from 'react-redux';
import {store} from './store/store'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <CEFApp />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
