import React from 'react';
import Container from '@mui/material/Container';
import Header from './components/Header';
import Content from './components/Content';
import { ToastProvider } from './context/ToastContext';

function App() {
  return (
    <ToastProvider>
      <Header />
      <Container>
        <Content />
      </Container>
    </ToastProvider>
  );
}

export default App;
