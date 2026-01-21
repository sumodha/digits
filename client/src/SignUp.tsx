import "./SignUp.css";
import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';


const SignUp = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }


    useEffect(() => {
        document.body.style.backgroundColor = "#74659c";
        document.body.style.display = "flex";
        document.body.style.justifyContent = "center";
        document.body.style.alignItems = "center";
        document.body.style.height = "100vh";
            }, []);


    return (
        <>
        <div id = "signup-container">
            <h1 className="title"> Create an Account</h1>
            <h2 className = "sub-title"> Sign Up for Digits</h2>
            <form onSubmit = {handleSubmit}>
            <input type="text" name="username" value={username}placeholder="Username" onChange = {(e) => setUsername(e.target.value)} required/>
            <input type="password" name="password" value={password} placeholder="Password" onChange = {(e) => setPassword(e.target.value)} required/>
            <input type="password" name="confirm-password" placeholder="Confirm Password" onChange = {(e) => setPassword(e.target.value)} required/>
            <button type = "submit" id="submit">Sign Up</button>
            
            </form>
            <p> Already have an account? <Link to= "/signin">Sign In</Link></p>
            <p><Link to= "/play">Play</Link> as guest</p>
        </div>


        
        </>
    );
}

export default SignUp;