import React, { useState } from 'react';
import './App.css';
import { ApolloProvider } from '@apollo/client';
import client from './client';
import CountryList from './CountryList';
import Animation from './Animation';

function App() {
  const [animationCompleted, setAnimationCompleted] = useState(false);

  const handleAnimationComplete = () => {
    setAnimationCompleted(true);
  };

  return (
    <ApolloProvider client={client}>
      {animationCompleted ? (
        <CountryList />
      ) : (
        <Animation onAnimationComplete={handleAnimationComplete} />
      )}
    </ApolloProvider>
  );
}

export default App;
