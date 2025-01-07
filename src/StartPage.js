import './StartPage.css';
import { useNavigate } from 'react-router-dom';
import {Helmet} from 'react-helmet-async';

function PlayButton(){
    const navigate = useNavigate();
    return (
        <button className = "startpage-button" onClick = {() => navigate('/home')}>
            play
        </button>
    );
}

function LogInButton(){
    return (
        <button className = "startpage-button">
            log in
        </button>
    );
}

const StartPage = () => {
    return (
        <>
        <Helmet>
            <title> digits </title>
            <style>{`
            body {
                background-color: #74659c;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
            }
            `}</style> /* back ticks */
        </Helmet>
        <div id = "start-container">
            <h1 id="start-header">
                 digits
            </h1>
            <p id = "start-info"> a remake of new york times digits</p>
            <div id = "buttons-container"> 
            <LogInButton> </LogInButton>
            <PlayButton> </PlayButton>
            </div>
        </div>
        </>

    );
}

export default StartPage;