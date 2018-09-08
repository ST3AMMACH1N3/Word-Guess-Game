window.onload = function() {
    var game = {
        wins: 0,
        word: "",
        wordList: ["html", "css", "javascript", "array", "function", "method", "variable", "string", "boolean", "object", "loop", "conditional", "agile", "bootstrap", "react"],
        beginElem: document.getElementById("begin-label"),
        winElem: document.getElementById("wins-output"),
        wordElem: document.getElementById("word-output"),
        remainingElem: document.getElementById("remaining-output"),
        guessedElem: document.getElementById("guessed-output"),

        pickWord: function() {
            this.word = this.wordList[Math.floor(Math.random() * this.wordList.length)];
        }
    }
}