import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApplicationStateContextProvider } from './Application/StateProvider';

ReactDOM.render(
  <React.StrictMode>
    <ToastContainer />
    <ApplicationStateContextProvider>
        <App />
    </ApplicationStateContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
