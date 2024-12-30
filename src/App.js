import StartPage from './StartPage';
import HomePage from './HomePage';
import './App.css';
import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element = {<StartPage></StartPage>}/>
      <Route path="/home" element = {<HomePage></HomePage>}/>
    </Routes>
    </Router>
  );
}

export default App;
