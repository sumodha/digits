import StartPage from './StartPage.js';
import GamePage from './GamePage.js';
import SignIn from './SignIn.js';
import SignUp from './SignUp.js';
import './App.css';
import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UsernameProvider } from './UsernameContext.js';


const App = () => {
  return (
    <UsernameProvider>
    <Router>
    <Routes>
      <Route path="/" element = {<StartPage></StartPage>}> </Route>
      <Route path="/play" element = {<GamePage></GamePage>}> </Route>
      <Route path="/signin" element = {<SignIn></SignIn>}> </Route>
      <Route path="/signup" element = {<SignUp></SignUp>}> </Route>
    </Routes>
    </Router>
    </UsernameProvider>
  );
}

export default App;
