import StartPage from './StartPage.js';
import GamePage from './GamePage.js';
import './App.css';
import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element = {<StartPage></StartPage>}> </Route>
      <Route path="/game" element = {<GamePage></GamePage>}> </Route>
    </Routes>
    </Router>
  );
}

export default App;
