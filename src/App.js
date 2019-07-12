import React from 'react';
import './App.css';
import Home from './pages/Home';
import Create from './pages/Create';
import Salao from './pages/Salao';
import {BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Route path="/" exact component={Home} />
          <Route path="/salao" component={Salao} />
          <Route path="/cozinha" component={Cozinha} />
          <Route path="/create" component={Create} />
        </header>
      </div>
    </Router>
  );
}

function Cozinha() {
  return (
    <div>EM CONSTRUÇÃO</div>
  )
}

export default App;