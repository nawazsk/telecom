import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from './components/organisms/LoginForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="container">
        <LoginForm />
      </div>
    </div>
  );
}

export default App;
