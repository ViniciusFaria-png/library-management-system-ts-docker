import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline, Container } from '@mui/material';
import Header from './components/Header';
import BookTest from './components/BookTest';

function App() {
  return (
    <div>
      <h1>Library Frontend</h1>
      <BookTest />
    </div>
  );
}

export default App;