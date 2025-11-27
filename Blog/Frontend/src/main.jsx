
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import './output.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthProvider.jsx';

createRoot(document.getElementById('root')).render(
 
    <BrowserRouter>
      <AuthProvider>
        <Toaster 
          position="top-right" 
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              style: {
                background: '#10b981',
              },
            },
            error: {
              style: {
                background: '#ef4444',
              },
            },
          }}
        />
        <App />
      </AuthProvider>
    </BrowserRouter>
  
);
