import React from 'react';
import './App.css';
import 'flexboxgrid/dist/flexboxgrid.css';
import LoginForm from './components/organisms/LoginForm';

function App() {
  return (
    <div className="App">
      <div className="row center-lg">
          <div className="col-lg-9">
            <LoginForm />
          </div>
      </div>
    </div>
  );
}

export default App;
