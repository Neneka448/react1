import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import 'normalize.css'
import './index.css';
import App from './App';
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<div>Loading</div>}>
        <App />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
