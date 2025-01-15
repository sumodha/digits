import "./GamePage.css";
import {Helmet} from 'react-helmet-async';
import React, {useState, useEffect} from "react";



const data =  [{target: 1, numbers: [1,2,3,4,5,6]}, 
                {target: 2, numbers: [7,8,9,10,11,12]}, 
                {target: 3, numbers: [13,14,15,16,17,18]}, 
                {target: 4, numbers: [19,20,21,22,23,24]}, 
                {target: 5, numbers: [25,26,27,28,29,30]}, ];
const operations = ["+", "-", "*", "/"];

/* okay numberbuttons
you click it then if u click another button then it clicks that one active 
if u click out then no active buttons 
you have to be able to change arr 
if operation is active, then yoiu can active two index 
*/
const GamePage = () => {
    const [index, setIndex] = useState(0); // target index
    const [opIndex, setOpIndex] = useState(null); // operation index 
    const [numbers, setNumbers] = useState(data[index].numbers);
    const [numIndex, setNumIndex] = useState([]);
    const [history, setHistory] = useState(["Completed operations will appear here."]);

    function evaluate(num1, num2, op) {
        let result = eval(num1 + op + num2);

        // if the result is negative or it is a decimal, 
        // then return -1 instead of the result
        if (result < 0 || !Number.isInteger(result)) {
            return -1;
        }
        else return result;
        
    }

    useEffect(() => {if (numIndex.length == 2) {
        // once you click two number buttons, 
        // hide the first number button
        // evaluate the value
        let num1 = String(numbers[numIndex[0]]);
        let num2 = String(numbers[numIndex[1]]);
        let op = operations[opIndex];
        let result = evaluate(num1, num2, op); 
        if (result == -1) {
            setOpIndex(null);
            setNumIndex([]);
        }
        else {
            setNumbers(numbers.map((element, idx) => idx == numIndex[0] ? "X" : idx == numIndex[1] ? result: element));
            setHistory([...history, num1 + " " + op + " " + num2 +  " = " + String(result)]);
            setOpIndex(null);
            setNumIndex([]);

        }

    }}, [numIndex, numbers]);

    function handleTargetClick(e){
        setIndex(Number(e.target.id)); // switching the tab 
        setOpIndex(null); // resetting operations; making none of them active
        setNumIndex([]); // resetting numbers; making none of them active
        setNumbers(data[Number(e.target.id)].numbers);
        setHistory(["Completed operations will appear here."]);
    
    }

    function handleOpClick(e){
        if (e.target.className === "operations active") {
            setOpIndex(null); // if it was active, then don't make it active anymore
        }
        else setOpIndex(Number(e.target.id)); // else, make this new one active
    }


    function handleNumberClick(e){
        if (opIndex == null) {
            if (e.target.className == "numbers active") {
                setNumIndex(_ => []); // if it was active, then don't make it active anymore
            }
            else setNumIndex(_ => [Number(e.target.id)]); // else, make this new one active
        }
        else if (numIndex.length < 2){ // when you click an operation, you can choose 2 buttons instead
            if (e.target.className == "numbers active") {
                setNumIndex(_ => []); // if it was active, then don't make it active anymore
            }
            else setNumIndex(prev => [...prev, Number(e.target.id)]); // else, make this new one active     
        }
    }

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
            `}</style> 
        </Helmet>
        <div id = "header-container">
            <h1 id="home-header"> digits </h1>
            <p id = "date"> tuesday, january 7 </p>
        </div>
        <div id="target-container">
            {data.map((element, idx) => 
            <button className = {index === idx ? "targets active" : "targets"} 
            key = {idx} id = {idx} onClick = {handleTargetClick}> {element.target}
            </button> )}
        </div>
        <div id="page-container">
        <div id="game-container">
            <p id="instructions"> Use any combination of numbers to reach the target: </p>
            <h1 id = "target-number"> {data[index].target}</h1>
            <div id= "number-container">
            {numbers.map((element, idx) => 
            <button className = {numIndex.indexOf(idx) != -1 ? "numbers active" : "numbers"} key = {idx} id = {idx} onClick = {handleNumberClick} style = {{visibility: element == "X" ? "hidden" : "visible"}} > {element}
            </button>
            )}
            </div>
            <div id="operations-container">
            <button id = "back"> @ </button>
            {operations.map((element, idx) => 
                <button className = {opIndex == idx ? "operations active" : "operations"} id = {idx} key = {element} onClick = {handleOpClick} > {element}
                </button>)}
            </div>
            <button id = "submit"> submit</button>
        </div>
        <div id = "info-container"> 
        <div id = "history-container">
            {history.map((element, idx) => 
            <p className = "history"> {element} </p>
            ) }
        </div>
        </div>
        </div>

        
        </>
    );
}

export default GamePage