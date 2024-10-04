import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
    uri: import.meta.env.VITE_API_URL + import.meta.env.VITE_API_ENDPOINT
})

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('authToken')
    return {
        headers: {
            ...(headers as Record<string, string>),
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
})

export const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})
