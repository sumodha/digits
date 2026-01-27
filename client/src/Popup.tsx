"use client"
import {useState} from 'react';
import './Popup.css'

type popUpProps = {
    setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>,
    history: string[],
    target: number,
    number: number,
    setIndex: React.Dispatch<React.SetStateAction<number>>
}
const Popup = ({setOpenPopup, history, target, number, setIndex} : popUpProps) => {



   
    const handleCancel = () => {
        setOpenPopup(false);

    }

    const handleNext = () => {
        setOpenPopup(false);
        setIndex(prev => prev == 4? 0: prev + 1);
    }

   


    
    return (
        <div id = "Popup-overlay">
        <div id="Popup-container">
            <h1>Great Job!</h1>
            <p><b>Your solution:</b> </p>
            {history.map((element, idx) => idx == 0?
            <></>: <p> {element} </p>
            ) }
            <br></br>
            <p>Target: {target}</p>
            <p>You got: {number}</p>
            <p>Difference: {Math.abs(target-number)}</p>
            <br></br>
            <button className ="next-puzzle-button" onClick={handleNext}>next puzzle</button>
            <br></br>
            <button className ="back-puzzle-button" onClick={handleCancel}>back to puzzles</button>
            

        
            
            
        </div>
        </div>

    );
}

export default Popup;