import React from 'react';
import './App.css';
import { ApolloProvider } from '@apollo/client';
import client from './client';
import CountryList from './CountryList';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Country List</h1>
        <CountryList />
      </div>
    </ApolloProvider>
  );
}

export default App;
