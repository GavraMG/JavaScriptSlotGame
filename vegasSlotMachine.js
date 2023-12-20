// Code Outline:
// 1. deposit some money
// 2. find out the number of lines to bet on
// 3. collect the bet amount
// 4. spin the slot machine 
// 5. check if the user won
// 6. give the users their earnings
// 7. play again

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
}

const SYMBOLS_VALUE = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2
}

// Function #1 - Deposit some money
const deposit = () => {
    while(true) {    
        const depositAmount = prompt("Enter a deposit amount: ")
        const numberDepositAmount = parseFloat(depositAmount);

        if(isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
            console.log("Invalid deposit amount, please try again.");
        } 
        else {
            return numberDepositAmount;
        }
    }
};

// Function #2 - Find out the number of lines to bet on
const getNumberOfLines = () => {
    while(true) {    
        const lines = prompt("Enter the number of lines you would like to bet on (1-3): ")
        const numberOfLines = parseFloat(lines);

        if(isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
            console.log("Invalid number of lines to bet on, please try again.");
        } 
        else {
            return numberOfLines;
        }
    }
};

// Function #3 - collect the bet amount
const getBet = (balance, lines) => {
    while(true) {    
        const bet = prompt("Enter the total bet per line: ")
        const numberBet = parseFloat(bet);

        if(isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
            console.log("Invalid bet, please try again.");
        } 
        else {
            return numberBet;
        }
    }
};

// function #4 - spin the slot machine
const spin = () => {
    const symbols = [];
    for (const[symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for(let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }

    const reels = [[], [], []];
    for (let i = 0; i < COLS; i++) {
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }

    return reels;
};

// Function #5 - check if the user won
const transpose = (reels) => {
    const rows = [];

    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i])
        }
    }

    return rows
};

const printRows = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol
            if (i != row.length - 1) {
                rowString += " | "
            }
        }
        console.log(rowString);
    }
};

// Function #6 - give the users their earnings
const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }

        if (allSame) {
            winnings += bet * SYMBOLS_VALUE[symbols[0]]
        }
    }

    return winnings;
};

const game = () => {
    let balance = deposit();

    while (true) {
        console.log("You have a total balance of $" + balance);
        const numberOfLines = getNumberOfLines();
        const bet = getBet(balance, numberOfLines);
        balance -= bet * numberOfLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, numberOfLines);
        balance += winnings;
        console.log("You have won, $" + winnings.toString());

        if (balance <= 0) {
            console.log("You sadly ran out of money!");
            break;
        }

        const playAgain = prompt("Would you like to play again (y/n)? ");

        if(playAgain != "y") break;
        
    }
}

game();




