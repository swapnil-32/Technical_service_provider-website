import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'         //in App.jsx file we export App default so here we directly write App without {App}  when we not export default then we need to import it like object i.e {App}
import './index.css'

import { AuthProvider } from './store/auth.jsx'    //this is context provider see the front_end_info file for more info
import { ToastContainer, toast } from 'react-toastify';     //we import here becouse it is main file so that we can use this any page
ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <React.StrictMode>
    <App />
    {/* <ToastContainer /> */}
    <ToastContainer 
    position="top-right"
    autoClose={4581}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="colored"
    transition: Bounce
    bodyClassName="toastBody"
    />
  </React.StrictMode>
  </AuthProvider>
  
)
