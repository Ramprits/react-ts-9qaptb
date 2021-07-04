import React, { Component } from 'react';
import { render } from 'react-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://dhanai-fruits.hasura.app/v1/graphql',
  cache: new InMemoryCache()
});

import App from './app';

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
