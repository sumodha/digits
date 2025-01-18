import "./GamePage.css";
import {Helmet} from 'react-helmet-async';
import React, {useState, useEffect} from "react";



const data =  [{target: 65, numbers: [1,6,7,9,20,22]}, 
                {target: 168, numbers: [2,5,9,10,21,25]}, 
                {target: 216, numbers: [1,2,4,7,14,23]}, 
                {target: 367, numbers: [3,5,9,10,19,25]}, 
                {target: 427, numbers: [2,3,5,15,17,21]}, ];
const operations = ["+", "-", "*", "/"];
const todaysdate = getDate();

function getDate(){
    const date = new Date();
    let day = date.getDate();
    let months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
    let month = months[date.getMonth()];
    let daysofweek = ["sunday", "monday", "tueday", "wednesday", "thursday", "friday", "saturday"];
    let dayofweek = daysofweek[date.getDay()];

    return dayofweek + ", " + month + " " + day;

}

/* okay numberbuttons
you click it then if u click another button then it clicks that one active 
if u click out then no active buttons 
you have to be able to change arr 
if operation is active, then yoiu can active two index 
*/
const GamePage = () => {
    const [index, setIndex] = useState(0); // target index
    const [opIndex, setOpIndex] = useState(null); // operation index 
    const [numbers, setNumbers] = useState(data[0].numbers); // number buttons
    const [numIndex, setNumIndex] = useState([]); // active number buttons
    const [history, setHistory] = useState(["Your operations"]); // history
    const [active, setActive] = useState(false); // submit button 


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

    useEffect(() => { if (numIndex.length == 1 && numbers[numIndex[0]] === data[index].target) {
        setActive(true);
    }
    else {
        setActive(false);
    }

    }, [numIndex])

    function handleTargetClick(e){
        setIndex(Number(e.target.id)); // switching the tab 
        setOpIndex(null); // resetting operations; making none of them active
        setNumIndex([]); // resetting numbers; making none of them active
        setNumbers(data[Number(e.target.id)].numbers);
        setHistory(["Your operations"]);
    
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
            <p id = "date"> {todaysdate}</p>
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
            <button className = {active? "submit active": "submit"} > submit</button>
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