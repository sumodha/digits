import './StartPage.css';
import { useNavigate } from 'react-router-dom';

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
        <div id = "start-container">
            <h1 >
                 digits
            </h1>
            <p > a remake of new york times digits</p>
            <div id = "buttons-container"> 
            <LogInButton> </LogInButton>
            <PlayButton> </PlayButton>
            </div>
        </div>

    );
}

export default StartPage;