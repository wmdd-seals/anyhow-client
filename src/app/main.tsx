import { ReactNode, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Router } from './router'
import './index.css'

export function App(): ReactNode {
    return <Router />
}

const root = createRoot(document.getElementById('root')!)
root.render(
    <StrictMode>
        <App />
    </StrictMode>
)
