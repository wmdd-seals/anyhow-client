import { type ReactNode, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Router } from './router'
import './index.css'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from 'src/shared/api'

function App(): ReactNode {
    return (
        <ApolloProvider client={apolloClient}>
            <Router />
        </ApolloProvider>
    )
}

const root = createRoot(document.getElementById('root')!)
root.render(
    <StrictMode>
        <App />
    </StrictMode>
)
