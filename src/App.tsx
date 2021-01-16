import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from, useQuery } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import Weather from "./weather"

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => alert(`Graphql error ${message}`))
  }
})

const link = from([errorLink, new HttpLink({ uri: "http://graphql-weather-api.herokuapp.com/graphql" })])
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
})
function App() {
  return (
    <ApolloProvider client={client}>
      <Weather/>
    </ApolloProvider>
  );
}
 
export default App;
