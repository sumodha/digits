import "./GamePage.css";
import {Helmet} from 'react-helmet-async';

function NumberButton({num}){
    return (
        <button className="numbers" >
             {num} </button>

    );

}

function TargetButton({num}) {
    return (
        <button className = "targets"> {num} </button>
    );
}

function OperationButton({op}){
    return (
        <button className = "operations"> {op}</button>
    )
}


const GamePage = () => {
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
        <div id="target-container">
            <TargetButton num = "5"> </TargetButton>
            <TargetButton num = "5"> </TargetButton>
            <TargetButton num = "5"> </TargetButton>
        </div>
        <div id="game-container">
            <p id="instructions"> Use any combination of numbers to reach the target: </p>
            <h1 id = "target-number"> 56</h1>
            <div id= "number-container">
            <NumberButton num="155"></NumberButton>
            <NumberButton num="1"></NumberButton>
            <NumberButton num="1"></NumberButton>
            <NumberButton num="1"></NumberButton>
            <NumberButton num="1"></NumberButton>
            <NumberButton num="1"></NumberButton>
            </div>
            <div id="operations-container">
            <button id = "back"> @ </button>
            <OperationButton op="+"></OperationButton>
            <OperationButton op="-"></OperationButton>
            <OperationButton op="*"></OperationButton>
            <OperationButton op="/"></OperationButton>
            </div>
            <button id = "submit"> submit</button>
        </div>
        <div id = "history-container">
            <p id = "history"> Completed operations will appear here. </p>
        </div>

        
        </>
    );
}

export default GamePage