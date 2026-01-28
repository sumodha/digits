"use client"
import './Popup.css'

type NumberCell = number | "X";

type popUpProps = {
    setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>,
    history: string[],
    target: number,
    number: number,
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    saveData: (ind: number, step: number, numbers: NumberCell[][], history: string[]) => void,
    index: number,
    step: number,
    numbers: NumberCell[][]
}
const Popup = ({setOpenPopup, history, target, number, setIndex, saveData, index, step, numbers} : popUpProps) => {



   
    const handleCancel = () => {
        setOpenPopup(false);

    }

    const handleNext = () => {
        saveData(index, step, numbers, history);
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