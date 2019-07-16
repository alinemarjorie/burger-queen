import React from 'react';
import './App.css';
import Home from './pages/Login/Home';
import Create from './pages/Login/Create';
import Salao from './pages/Salão/Salao';
import {BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Route path="/" exact component={Home} />
          <Route path="/salao" component={Salao} />
          <Route path="/create" component={Create} />
        </header>
      </div>
    </Router>
  );
}

export default App;