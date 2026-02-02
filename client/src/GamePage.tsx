import "./GamePage.css";
import {useState, useEffect} from "react";
import user from "./assets/profile.svg";
import Popup from './Popup.js';

localStorage.clear();

const API = import.meta.env.VITE_API;
const operations = ["+", "−", "×", "÷"];
const todaysdate = getDate();


function getDate(): string{
    const date = new Date();
    const day = date.getDate();
    const months: string[] = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
    const month = months[date.getMonth()];
    const daysofweek: string[] = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const dayofweek = daysofweek[date.getDay()];

    return dayofweek + ", " + month + " " + day;

}


type GameData = {
  target: number;
  numbers: number[];
};

type NumberCell = number | "X";



function GamePage(){
    
    const [index, setIndex] = useState<number>(0); // panel index 
    const [opIndex, setOpIndex] = useState<number | null>(null); // operation index 
    const [data, setData] = useState<GameData[]>([{target: 0, numbers: [0,0,0,0,0,0]}, 
                {target:0, numbers: [0,0,0,0,0,0]}, 
                {target: 0, numbers: [0,0,0,0,0,0]}, 
                {target: 0, numbers: [0,0,0,0,0,0]}, 
                {target: 0, numbers: [0,0,0,0,0,0]}, ]); // data
    const [numbers, setNumbers] = useState<NumberCell[][]>([data[index].numbers]); // history of number buttons
    const [numIndex, setNumIndex] = useState<number[]>([]); // number buttons that are active 
    const [history, setHistory] = useState<string[]>(["Your operations"]); // history
    const [active, setActive] = useState<boolean>(false); // submit button 
    const [submit, setSubmit] = useState<string>("submit");
    const [step, setStep] = useState<number>(0); // step number 
    const [openPopup, setOpenPopup] = useState(false);


    useEffect(() => {
  document.body.classList.add("game-page");
  return () => document.body.classList.remove("game-page");
}, []);



    // Gets today's game from backend
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${API}/game`);
            const response = await res.json();
            setData(response.items.data)
        }
        fetchData();
    }, []);


    // Once you click two number buttons, 
    // Hide the first number button
    // & Evaluate the value 
    useEffect(() => {if (numIndex.length == 2) {
        const num1 = numbers[step][numIndex[0]];
        const num2 = numbers[step][numIndex[1]];
        
        if (opIndex == null) {
            return;
        }

        const ops = ["+", "-", "*", "/"];
        const op = ops[opIndex];
        
        const result = evaluate(num1 as number, num2 as number, op); 

        if (result == null) { // if evaluation results in a decimal
            setOpIndex(null); // make no operations active 
            setNumIndex([]); // make no number buttons active 
        }
        else {
            const updated = numbers[step].map((element, idx) => idx == numIndex[0] ? "X" : idx == numIndex[1] ? result: element);
            setNumbers(prev => [...prev, updated]);
            setStep(prev => prev + 1);
            setHistory([...history, num1 + " " + op + " " + num2 +  " = " + String(result)]);
            setOpIndex(null);
            setNumIndex([]);

        }

    }}, [numIndex, numbers]);



    // makes submit button active if within 6 of it 
    useEffect(() => { 
        
        if (numIndex.length != 1) {
            setSubmit("submit");
            setActive(false);
            return;
        }
        const diff = Math.abs(numbers[step][numIndex[0]] as number - data[index].target);
        if (diff == 0) {
            setActive(true);
            setSubmit("submit ☆☆☆");
        }
        else if (diff <= 5) {
            setActive(true);
            setSubmit("submit ☆☆");
        }
        else if (diff <=10) {
            setActive(true);
            setSubmit("submit ☆");
        }
        else {
            setSubmit("submit");
            setActive(false);
        }
        

    }, [numIndex]);


    // When the index changes, we look at local storage 
    // If it is in local storage, we get it
    // If not, we reset
    useEffect(() => {
        const savedData = localStorage.getItem(`tab-${index}`);
        if (savedData) {
            const { step, numbers, history } = JSON.parse(savedData);
            setStep(step);
            setNumbers(numbers);
            setHistory(history);
        
        }
        else {
            setNumbers([data[index].numbers]);
            setHistory(["Your operations"]); 
            setStep(0);
        }

        setSubmit("submit");
        setOpenPopup(false);
        setActive(false);
        setNumIndex([]);

    }, [data,index]);


    // evaluates expression
    function evaluate(num1: number, num2: number, op : string): number | null{
        

        switch (op) {
            case "+":
                return num1 + num2;
            case "-":
                return num1 - num2;
            case "*":
                return num1 * num2;
            case "/":
                const result = num1 / num2;
                if (!Number.isInteger(result)) {
                    return null;
                }
                return result;
        };
        
        return null;
        
    }


    // saves data 
    function saveData (ind: number, step: number, numbers: NumberCell[][], history: string[] ) {
        localStorage.setItem('tab-' + ind, JSON.stringify({ step, numbers, history }));
    }

    // HANDLING CLICKS...
    function handleTargetClick(e : React.MouseEvent<HTMLButtonElement>){

        saveData(index, step, numbers, history);

        const target_num = Number(e.currentTarget.id);
        setIndex(target_num); // switching the tab 
        setOpIndex(null); // resetting operations; making none of them active
        setNumIndex([]); // resetting numbers; making none of them active

    
    }
    
    function handleOpClick(e: React.MouseEvent<HTMLButtonElement>){
        if (e.currentTarget.className === "operations active") {
            setOpIndex(null); // if it was active, then don't make it active anymore
        }
        else setOpIndex(Number(e.currentTarget.id )); // else, make this new one active
    }

    function handleBackClick(){
        if (step > 0) {
            setStep(prev => prev - 1);
            setNumIndex([]);
            setOpIndex(null);
            setSubmit("submit");
            setActive(false);
            numbers.pop();
            history.pop();
        }
    }


    function handleNumberClick(e: React.MouseEvent<HTMLButtonElement>){
        if (opIndex == null) {
            if (e.currentTarget.className == "numbers active") {
                setNumIndex(_ => []); // if it was active, then don't make it active anymore
            }
            else {
                const num = Number(e.currentTarget.id);
                setNumIndex(_ => [num]); // else, make this new one active
            }
                
        }
        else if (numIndex.length < 2){ // when you click an operation, you can choose 2 buttons instead
            if (e.currentTarget.className == "numbers active") {
                setNumIndex(_ => []); // if it was active, then don't make it active anymore
            }
            else  {
                const num = Number(e.currentTarget.id);
                setNumIndex(prev => [...prev, num]); // else, make this new one active     

            }
                
        }
    }

    return (
        <>
      
        <div id = "header-container">
            <div id = "left-side">
            <h1 id="home-header"> digits </h1>
            <p id = "date"> {todaysdate}</p>
            </div>
            <div id = "right-side">
    
                <img id = "profile" src = {user}></img>
                <p id = "username">guest</p>
    
            </div>
        </div>
        <div id="target-container">
            {data.map((element, idx) => 
            <button className = {index === idx ? "targets active" : "targets"} 
            key = {idx} id = {String(idx)} onClick = {handleTargetClick}> {element.target}
            </button> )}
        </div>
        <div id="page-container">
        <div id="game-container">
            <p id="instructions"> Use any combination of numbers to reach the target: </p>
            <h1 id = "target-number"> {data[index].target}</h1>
            <div id= "number-container">
            {numbers[step].map((element, idx) => 
            <button className = {numIndex.indexOf(idx) != -1 ? "numbers active" : "numbers"} key = {idx} id = {String(idx)} onClick = {handleNumberClick} style = {{visibility: element == "X" ? "hidden" : "visible"}} > {element}
            </button>
            )}
            </div>
            <div id="operations-container">
            <button id = "back" onClick = {handleBackClick}> ⟲</button>
            {operations.map((element, idx) => 
                <button className = {opIndex == idx ? "operations active" : "operations"} id = {String(idx)} key = {String(idx)} onClick = {handleOpClick} > {element}
                </button>)}
            </div>
            <button className = {active? "submit active": "submit"} onClick = {() => active? setOpenPopup(true): setOpenPopup(false)}> {submit}</button>
        </div>
        <div id = "info-container"> 
        <div id = "history-container">
            {history.map((element) => 
            <p className = "history"> {element} </p>
            ) }
        </div>
        </div>
        </div>

        {openPopup && active && <Popup setOpenPopup = {setOpenPopup} history = {history} target = {data[index].target} number = {numbers[step][numIndex[0]] as number} setIndex = {setIndex} saveData = {saveData} index = {index} step = {step} numbers = {numbers}></Popup>}
   
        </>
    );
}

export default GamePage