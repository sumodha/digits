import './StartPage.css';
import { useNavigate } from 'react-router-dom';
import {useEffect} from 'react';
const todaysdate = getDate();

function getDate(){
    const date = new Date();
    let day = date.getDate();
    let months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
    let month = months[date.getMonth()];
    let daysofweek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    let dayofweek = daysofweek[date.getDay()];

    return dayofweek + ", " + month + " " + day;

}

const StartPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
  document.body.classList.add("start-page");
  return () => document.body.classList.remove("start-page");
}, []);


    return (
        <>
        <div id = "start-container">
            <h1 id="start-header">
                 digits
            </h1>
            <p id = "start-info"> a remake of new york times digits</p>
            <button className = "play-button" onClick = {() => navigate('/play')}>
            play [as guest]</button>
            <div className = "auth-row"> 
            <button className = "auth-button" onClick = {() => navigate('/signin')}>sign in</button>
            <button className = "auth-button" onClick = {() => navigate('/signup')}>sign up</button>
            </div>
            <p id="startpage-date"> {todaysdate}</p>
            
            
        </div>

        </>

    );
}

export default StartPage;