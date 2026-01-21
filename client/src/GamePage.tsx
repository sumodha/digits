import "./GamePage.css";
import {useState, useEffect} from "react";
import user from "./assets/profile.png";

localStorage.clear();

const API = import.meta.env.VITE_API as string;
const operations = ["+", "-", "*", "/"];
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

/* okay numberbuttons
you click it then if u click another button then it clicks that one active 
if u click out then no active buttons 
you have to be able to change arr 
if operation is active, then yoiu can active two index 
*/

type GameData = {
  target: number;
  numbers: number[];
};

type NumberCell = number | "X";



function GamePage(){
    
    const [index, setIndex] = useState<number>(0); // target index
    const [opIndex, setOpIndex] = useState<number | null>(null); // operation index 
    const [data, setData] = useState<GameData[]>([{target: 0, numbers: [0,0,0,0,0,0]}, 
                {target: 0, numbers: [0,0,0,0,0,0]}, 
                {target: 0, numbers: [0,0,0,0,0,0]}, 
                {target: 0, numbers: [0,0,0,0,0,0]}, 
                {target: 0, numbers: [0,0,0,0,0,0]}, ])
    const [numbers, setNumbers] = useState<NumberCell[][]>([data[index].numbers]); // number buttons
    const [numIndex, setNumIndex] = useState<number[]>([]); // active number buttons
    const [history, setHistory] = useState<string[]>(["Your operations"]); // history
    const [active, setActive] = useState<boolean>(false); // submit button 
    const [step, setStep] = useState<number>(0);

    
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${API}/game`);
            const response = await res.json();
            console.log(response)
            setData(response.items.data)
            console.log(response.items.data)
        }
        fetchData();
    }, []);

  

    function evaluate(num1: string, num2: string, op : string): number{
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
        let num1 = String(numbers[step][numIndex[0]]);
        let num2 = String(numbers[step][numIndex[1]]);
        if (opIndex == null) {
            return;
        }
        let op = operations[opIndex];
        let result = evaluate(num1, num2, op); 
        if (result == -1) {
            setOpIndex(null);
            setNumIndex([]);
        }
        else {
            let updated = numbers[step].map((element, idx) => idx == numIndex[0] ? "X" : idx == numIndex[1] ? result: element);
            setNumbers(prev => [...prev, updated]);
            setStep(prev => prev + 1);
            setHistory([...history, num1 + " " + op + " " + num2 +  " = " + String(result)]);
            setOpIndex(null);
            setNumIndex([]);

        }

    }}, [numIndex, numbers]);

    useEffect(() => { if (numIndex.length == 1 && numbers[step][numIndex[0]] === data[index].target) {
        setActive(true);
    }
    else {
        console.log(numIndex);
        setActive(false);
    }

    }, [numIndex])

    const saveData = (ind: number, step: number, numbers: NumberCell[][], history: string[] ) => {
        localStorage.setItem('tab-' + ind, JSON.stringify({ step, numbers, history }));
    }

    function handleTargetClick(e : React.MouseEvent<HTMLButtonElement>){

        console.log(numbers);
        saveData(index, step, numbers, history);

        const target_num = Number(e.currentTarget.id);
        setIndex(target_num); // switching the tab 
        setOpIndex(null); // resetting operations; making none of them active
        setNumIndex([]); // resetting numbers; making none of them active

    
    }

    useEffect(() => {
        const savedData = localStorage.getItem(`tab-${index}`);
        console.log(savedData);
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

    }, [data,index])

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
                console.log(num);
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


    useEffect(() => {
    document.body.style.backgroundColor = "white";
    document.body.style.display = "flex";
    document.body.style.justifyContent = "left";
    document.body.style.alignItems = "left";
    document.body.style.height = "100vh";
        }, []);

    return (
        <>
        <div id = "header-container">
            <div id = "left-side">
            <h1 id="home-header"> digits </h1>
            <p id = "date"> {todaysdate}</p>
            </div>
            <div id = "right-side">
                <p id = "username">guest</p>
                <img id = "profile" src = {user}></img>
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
                <button className = {opIndex == idx ? "operations active" : "operations"} id = {String(idx)} key = {element} onClick = {handleOpClick} > {element}
                </button>)}
            </div>
            <button className = {active? "submit active": "submit"} > submit</button>
        </div>
        <div id = "info-container"> 
        <div id = "history-container">
            {history.map((element) => 
            <p className = "history"> {element} </p>
            ) }
        </div>
        </div>
        </div>

        
        </>
    );
}

export default GamePage