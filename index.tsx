import React, { Component } from 'react';
import { render } from 'react-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  createHttpLink,
  gql
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri:
    process.env.REACT_APP_API_URL ||
    'https://dhanai-fruits.hasura.app/v1/graphql'
});

const authLink = setContext(({ operationName }, prevCtx) => {
  const publicOperations = ['login', 'register'];
  if (
    operationName &&
    !publicOperations.includes(operationName.toLowerCase())
  ) {
    const token = localStorage.getItem('user_token');
    return {
      headers: {
        ...prevCtx.headers,
        Authorization: `Bearer ${token}`
      }
    };
  }
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
});

import App from './app';

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
