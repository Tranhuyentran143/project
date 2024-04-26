import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import RouterCustom from './routes/route';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
<RouterCustom></RouterCustom>
</BrowserRouter>);

