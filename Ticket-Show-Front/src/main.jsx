import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import '@tremor/react'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

//import { AuthProvider } from './context/AuthContext.jsx';

import axios from "axios";
    //axios.defaults.baseURL = "http://localhost:3001/";
     axios.defaults.baseURL = "https://ticketshow-n0gj.onrender.com/";

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}>
              <App />
        </PersistGate>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
);
