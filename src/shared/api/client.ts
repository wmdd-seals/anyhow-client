import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

// Will update the following when API's GraphQL endpoint is ready
const httpLink = createHttpLink({
    uri: 'http://'
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
