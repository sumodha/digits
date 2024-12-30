import './StartPage.css';
import { useNavigate } from 'react-router-dom';

function PlayButton(){
    const navigate = useNavigate();
    return (
        <button onClick = {() => navigate('/home')}>
            play
        </button>
    );
}

function LogInButton(){
    return (
        <button>
            log in
        </button>
    );
}

const StartPage = () => {
    return (
        <div>
            <h1>
                 digits
            </h1>
            <LogInButton> </LogInButton>
            <PlayButton> </PlayButton>
        </div>

    );
}

export default StartPage;