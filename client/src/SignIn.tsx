import "./SignIn.css";
import {useState, useEffect} from "react";
import { Link } from 'react-router-dom';


const SignIn = () => {
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
       
        <div id = "signin-container">
            <h1 className="title"> Welcome back</h1>
            <h2 className = "sub-title"> Sign In to Your Account</h2>
            <form onSubmit = {handleSubmit}>
            <input type="text" name="username" placeholder="Username" onChange = {(e) => setUsername(e.target.value)} required/>
            <input type="password" name="password" placeholder="Password" onChange = {(e) => setPassword(e.target.value)} required/>
            <button type = "submit" id="submit">Sign In</button>
            
            </form>
            <p> Don't have an account? <Link to = "/signup">Sign Up</Link></p>
            <p><Link to = "/play">Play</Link> as guest</p>

        </div>


        
        </>
    );
}

export default SignIn;