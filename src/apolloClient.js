import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Will replace the following with API's GraphQL endpoint
const httpLink = createHttpLink({
  uri: 'http://', 
});

// Optional: Set up authentication headers
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('authToken');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  };
});

// Initialize the Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),  // Concatenate authLink for authenticated requests
  cache: new InMemoryCache(),
});

export default client;
