let startTime = null, previousEndTime = null;
let currentLetterIndex = 0;
let arrayForm;

const modeSelect = document.getElementById("mode");
const wordDisplay = document.getElementById("word-display");
const inputField = document.getElementById("input-field");
const results = document.getElementById("results");
const sixty = document.getElementById("sixty");
const thirty = document.getElementById("thirty");
const fifteen = document.getElementById("fifteen");

const words = {
    easy: ["applee", "bananq", "grapee", "orange", "cherry"],
    medium: ["keyboard", "monitor", "printer", "charger", "battery"],
    hard: ["synchronize", "complicated", "development", "extravagant", "misconception"]
};

//get a random word
const getRandomWord = (mode) => {
    const wordList = words[mode];
    return wordList[Math.floor(Math.random() * wordList.length)];
};

// Initialize the typing test
let wordsToType = [];
const startTest = (wordCount = 50) => {
    for (let i = 0; i < wordCount; i++) {
        wordsToType.push(getRandomWord("easy"));
    }

    const letterToType = wordsToType.join(' ');
    console.log(letterToType);

    let arrayForm = [];
    arrayForm = Array.from(letterToType);
    console.log(arrayForm.length);
    
};



(startTest());