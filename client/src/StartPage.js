import './StartPage.css';
import { useNavigate } from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import {useState} from 'react';
const todaysdate = getDate();

function getDate(){
    const date = new Date();
    let day = date.getDate();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = months[date.getMonth()];
    let daysofweek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let dayofweek = daysofweek[date.getDay()];

    return dayofweek + ", " + month + " " + day;

}

const StartPage = () => {
    const navigate = useNavigate();

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
            <button className = "play-button" onClick = {() => navigate('/play')}>
            play [as guest]</button>
            <div class = "auth-row"> 
            <button className = "auth-button" onClick = {() => navigate('/signin')}>sign in</button>
            <button className = "auth-button" onClick = {() => navigate('/signup')}>sign up</button>
            </div>
            <p id="startpage-date"> {todaysdate}</p>
            
            
        </div>

        </>

    );
}

export default StartPage;