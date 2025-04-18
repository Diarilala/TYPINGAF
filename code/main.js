
let startTime = null, previousEndTime = null;
let currentLetterIndex = 0;
const wordsToType = [];
let arrayForm;

const modeSelect = document.getElementById("mode");
const wordDisplay = document.getElementById("word-display");
const inputField = document.getElementById("input-field");
const results = document.getElementById("results");

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
const startTest = (wordCount = 10) => {
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
        if (index === 0) span.style.color = "red"; // Highlight first word
        wordDisplay.appendChild(span);

    });
    inputField.value = "";
    results.textContent = "";
};

// Start the timer when user begins typing
const startTimer = () => {
    if (!startTime) startTime = Date.now();
};

// Calculate and return WPM & accuracy
const getCurrentStats = () => {
    const elapsedTime = (Date.now() - previousEndTime) / 1000; // Seconds
    const wpm = (arrayForm[currentLetterIndex].length) / (elapsedTime / 12); // 5 chars = 1 word
    const accuracy = (arrayForm[currentLetterIndex].length / inputField.value.length) * 100;

    return { wpm: wpm.toFixed(2), accuracy: accuracy.toFixed(2) };
};

// Move to the next word and update stats only on spacebar press
const updateWord = (event) => {
    if (event.key !== 'F5') { // Check if spacebar is pressed
        if (!previousEndTime) previousEndTime = startTime;
        
        if (currentLetterIndex < arrayForm.length) {
            const { wpm, accuracy } = getCurrentStats();
            results.textContent = `WPM: ${wpm}, Accuracy: ${accuracy}%`;

            currentLetterIndex++;
            previousEndTime = Date.now();
            highlightNextWord();

            inputField.value = ""; // Clear input field after space
            event.preventDefault(); // Prevent adding extra spaces
        }

    }
};

// Highlight the current word in red
const highlightNextWord = () => {
    const wordElements = wordDisplay.children;

    if (currentLetterIndex < arrayForm.length) {
        if (currentLetterIndex > 0) {
            wordElements[currentLetterIndex - 1].style.color = "black";
        }
        wordElements[currentLetterIndex].style.color = "red";
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
