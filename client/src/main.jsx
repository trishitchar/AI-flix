import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './scrollbar.css';
import { Toaster } from 'react-hot-toast'; 
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if(process.env.NODE_ENV === 'production') disableReactDevTools();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Toaster/>
  </React.StrictMode>,
);
