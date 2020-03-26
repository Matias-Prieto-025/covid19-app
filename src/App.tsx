import React from 'react';
import { Container } from './layout-components'; 
import Header from './components/Header/Header';
import Home from './pages/Home/Home';

function App() {
  return (
    <div className="App">
      <Header />
      <Container>
        <Home />
      </Container>
    </div>
  );
}

export default App;
