import StartPage from './StartPage.tsx';
import GamePage from './GamePage.tsx';
import SignIn from './SignIn.tsx';
import SignUp from './SignUp.tsx';
import './App.css';
import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App(){
  return (
    <Router>
    <Routes>
      <Route path="/" element = {<StartPage></StartPage>}> </Route>
      <Route path="/play" element = {<GamePage></GamePage>}> </Route>
      <Route path="/signin" element = {<SignIn></SignIn>}> </Route>
      <Route path="/signup" element = {<SignUp></SignUp>}> </Route>
    </Routes>
    </Router>
  );
}

export default App;
