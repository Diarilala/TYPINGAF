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
const startTest = (wordCount = 10) => {
    for (let i = 0; i < wordCount; i++) {
        wordsToType.push(getRandomWord("easy"));
    }

    const letterToType = wordsToType.join(' ');
    console.log(letterToType);

    let arrayForm = [];
    arrayForm = Array.from(letterToType);
    console.log(Array.from(letterToType)[40]);
    console.log(wordsToType[0]);
};

(startTest());