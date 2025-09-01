import "./SignIn.css";
import {Helmet} from 'react-helmet-async';
import React, {useState, useEffect} from "react";

const SignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    }

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
            `}</style> 
        </Helmet>
        <div id = "signin-container">
            <h1 class="title"> Welcome back</h1>
            <h2 class = "sub-title"> Sign In to Your Account</h2>
            <form onSubmit = {handleSubmit}>
            <input type="text" name="username" placeholder="Username" onChange = {(e) => setUsername(e.target.value)} required/>
            <input type="password" name="password" placeholder="Password" onChange = {(e) => setPassword(e.target.value)} required/>
            <button type = "submit" id="submit">Sign In</button>
            
            </form>
            <p> Don't have an account? <a href = "/signup">Sign Up</a></p>
            <p><a href = "/play">Play</a> as guest</p>

        </div>


        
        </>
    );
}

export default SignIn;