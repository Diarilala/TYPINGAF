
let startTime = null, previousEndTime = null;
let currentLetterIndex = 0;
const wordsToType = [];
let arrayForm;

const modeSelect = document.getElementById("mode");
const wordDisplay = document.getElementById("word-display");
const inputField = document.getElementById("input-field");
const results = document.getElementById("results");
const sixty = document.getElementById("sixty");
const thirty = document.getElementById("thirty");
const fifteen = document.getElementById("fifteen");

let timeLeft = 10; 
let timer; 
let timerStarted = false; 
const timerDisplay = document.getElementById("timer");

function updateTimer() {
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
        clearInterval(timer); 
        inputField.disabled = true; 
        const { wpm, accuracy } = getCurrentStats();
            results.textContent = `WPM: ${wpm}, Accuracy: ${accuracy}%`;
    }
    timeLeft--;
}

function endTest(){
    if(inputValue.length == arrayForm.length){
        clearInterval(timer);
        inputField.disabled = true;
        const { wpm, accuracy } = getCurrentStats();
            results.textContent = `WPM: ${wpm}, Accuracy: ${accuracy}%`;
    }
}

// Start timer on first keypress
inputField.addEventListener("keydown", () => {
    if (!timerStarted) {
        timerStarted = true;
        timeLeft = 10; 
        timer = setInterval(updateTimer, 1000); 
    }
});

const words = {
    easy: ["apple", "banana", "grape", "orange", "cherry"],
    medium: ["keyboard", "monitor", "printer", "charger", "battery"],
    hard: ["synchronize", "complicated", "development", "extravagant", "misconception"]
};

// Generate a random word from the selected mode
const getRandomWord = (mode) => {
    const wordList = words[mode];
    return wordList[Math.floor(Math.random() * wordList.length)];
};

// Initialize the typing test
const startTest = (wordCount = 50) => {
    wordsToType.length = 0; // Clear previous words
    wordDisplay.innerHTML = ""; // Clear display

    startTime = null;
    previousEndTime = null;

    for (let i = 0; i < wordCount; i++) {
        wordsToType.push(getRandomWord(modeSelect.value));
        const letterToType = wordsToType.join(' ');
    arrayForm = Array.from(letterToType);
    }
    const letterToType = wordsToType.join(' ');
    arrayForm = Array.from(letterToType);
    currentLetterIndex = 0;


    arrayForm.forEach((word, index) => {
        const span = document.createElement("span");
        span.textContent = word;
        wordDisplay.appendChild(span);


    });
    inputField.value = "";
    results.textContent = "";
};

// Start the timer when user begins typing
const startTimer = () => {
    if (!startTime) startTime = Date.now();
};

let incorrectLetter = 0;
const getCurrentStats = () => {
    const elapsedTime = 60 - timeLeft;
    const wpm = 60*((inputField.value.length/5)/elapsedTime);
    const accuracy = ((inputField.value.length - incorrectLetter)/inputField.value.length) * 100;

    return { wpm: wpm.toFixed(2), accuracy: accuracy.toFixed(2) };
}
// Move to the next word and update stats only on spacebar press
const updateWord = (event) => {
    if (event.key !== "Backspace") { // Check if spacebar is pressed    
            // const { wpm, accuracy } = getCurrentStats();
            // results.textContent = `WPM: ${wpm}, Accuracy: ${accuracy}%`;
            currentLetterIndex++;
            highlightNextWord();
    }else{
        if(currentLetterIndex >= 0){
        currentLetterIndex--;
        highlightPreviousWord();
        } else{
            currentLetterIndex = 0;
        }
    }
   
};

// Highlight the previous word
const highlightPreviousWord = () => {
    const wordElements = wordDisplay.children;
    const inputValue = inputField.value;

    if (currentLetterIndex < wordElements.length) {
        const currentWordElement = wordElements[currentLetterIndex];

        currentWordElement.style.color = "white";
        
    }
};

// Highlight the current word in red
const highlightNextWord = () => {
    const wordElements = wordDisplay.children;
    const inputValue = inputField.value;

    const inputLength = inputValue.length - 1;

    if (currentLetterIndex >= 0 && currentLetterIndex < wordElements.length) {
        const currentChar = inputValue.charAt(inputLength);
        const currentWordElement = wordElements[currentLetterIndex - 2];

        if(currentWordElement.textContent === currentChar){
            currentWordElement.style.color = "green";
        }else if(currentLetterIndex == wordElements.length){
            inputField.disabled = true;
        }
         else {
            currentWordElement.style.color = "red";
            incorrectLetter++;
        }
    }
};

// Event listeners
// Attach `updateWord` to `keydown` instead of `input`
inputField.addEventListener("keydown", (event) => {
    startTimer();
    updateWord(event);
});

modeSelect.addEventListener("change", () => startTest());

// Start the test
startTest();
