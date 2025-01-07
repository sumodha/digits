import StartPage from './StartPage.js';
import HomePage from './HomePage.js';
import './App.css';
import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element = {<StartPage></StartPage>}> </Route>
      <Route path="/home" element = {<HomePage></HomePage>}> </Route>
    </Routes>
    </Router>
  );
}

export default App;
