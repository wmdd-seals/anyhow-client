import { type ReactNode, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Router } from './router'
import './index.css'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '../shared/api'
import { AuthProvider } from '../shared/lib'

function App(): ReactNode {
    return (
        <ApolloProvider client={apolloClient}>
            <AuthProvider>
                <Router />
            </AuthProvider>
        </ApolloProvider>
    )
}

const root = createRoot(document.getElementById('root')!)
root.render(
    <StrictMode>
        <App />
    </StrictMode>
)
