import { useState } from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import AppRoutes from './routes/AppRoutes';
import { ToastProvider } from './context/ToastContext';
import ToastComponent from './components/ToastComponent';

function App() {
  return (
    <ToastProvider>
      < AppRoutes />
      <ToastComponent /> {/* Global toast */}
    </ToastProvider>
  )
}

export default App
