import React from 'react'
import { createRoot } from 'react-dom/client';
import App from './App'

import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'

import {BrowserRouter as Router} from "react-router-dom";

import { StateProvider } from './contexts/StateProvider';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('messasegin-user-token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    }
  }
})

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
})

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
    connectionParams: async () => {
      const token = localStorage.getItem('messasegin-user-token');
      return {
          Authorization: token ? `Bearer ${token}` : null,
      };
    }
  }
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink),
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
})

const container = document.getElementById('root');
const root = createRoot(container); 

root.render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <StateProvider>
          <Router>
            <App />
          </Router>
        </StateProvider>
      </ApolloProvider>
  </React.StrictMode>
)

