import "./HomePage.css";
import {Helmet} from 'react-helmet-async';

function NumberButton({num}){
    return (
        <button className="numbers" >
             {num} </button>

    );

}

const HomePage = () => {
    return (
        <>
        <Helmet>
            <title> digits </title>
            <style>{`
                body {
                    background-color: white;
                    display: flex;
                    justify-content: left;
                    align-items: left;
                    height: 100vh;
                }
            `}</style> /* back ticks */
        </Helmet>
        <div id = "header-container">
            <h1 id="home-header"> digits </h1>
            <p id = "date"> tuesday, january 7 </p>
        </div>
        
        </>
    );
}

export default HomePage