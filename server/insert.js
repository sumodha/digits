import {connectDB} from './db.js';


const insertData = async (data) => {
    await collection.insertMany(
        buildYear()
    )
}


const buildYear = () => {
    const days = [31,28,31,30,31,30,31, 31,30,31,30,31];
    const entries = [];

    for (let i = 0; i < 12; i++) {
        for (let j = 0; j < days[i]; j++) {
           entries.push(buildEntry(String(i+1)+ "/" + String(j+1)));
        }
    }

    return entries;

}

const buildMonth = (month, days) => {
    let entries = [];
    for (let j = 0; j < days; j++) {
           entries.push(buildEntry(String(month+1)+ "/" + String(j+1)));
    }
    return entries;
}


const buildEntry = (str) => {
    const entry = {
        date: str,
        data:[]
    }


    for (let i = 0; i < 5; i++) {
        let nums = buildNums();
        let target = makeTarget(nums);

        entry.data.push({target: target, numbers: nums});

    }

    return entry

}

const makeTarget = (arr) => {

    let target = arr[0];
    for (let i = 1; i < 6; i++) {
        target = solveExpr(target, arr[i]);
    
    }

    return target;
}

const buildNums = () => {
    let nums = [];

    while (nums.length < 6) {
        const num = Math.floor(Math.random() * 25) + 1;

        if (!nums.includes(num)) {
            nums.push(num);
        }
    }

    nums.sort((a, b) => a - b);
    
    return nums;
};


const solveExpr = (num1, num2) => {
    const operations = ["+", "-", "*", "/"];

    for (let attempts = 0; attempts < 100; attempts++) {
        const op = operations[Math.floor(Math.random() * operations.length)];
        const result = helper(num1, op, num2);

        if (Number.isInteger(result) && result >= 1 && result <= 900) {
            return result;
        }
    }

    return num1 + num2; 
};


const helper = (num1, op, num2) => {
    let result = 0; 
    switch (op) {
            case "+":
                result =  num1 + num2;
                break;
            case "-":
                result =  num1 - num2;
                break;
            case "*":
                result =  num1 * num2;
                break;
            case "/":
                result = num1 / num2;
                break;
                
    }
    return result;
}

const collection = await connectDB();
insertData();
console.log("Inserted Data");
