import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import SocketContextProvider from './context/providers/SocketContextProvider.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <SocketContextProvider>
            <App />
        </SocketContextProvider>
    </StrictMode>
)
