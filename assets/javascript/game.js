window.onload = function() {
    var game = {
        wins: 0,
        remaining: 10,
        word: "",
        progress: [],
        guessed: [],
        wordList: ["html", "css", "javascript", "array", "function", "method", "variable", "string", "boolean", "object", "loop", "conditional", "agile", "bootstrap", "react"],
        beginElem: document.getElementById("begin-label"),
        winElem: document.getElementById("wins-output"),
        wordElem: document.getElementById("word-output"),
        remainingElem: document.getElementById("remaining-output"),
        guessedElem: document.getElementById("guessed-output"),

        displayChange: function() {
            this.winElem.textContent = this.wins;
            this.wordElem.textContent = "";
            for(var i = 0; i < this.progress.length; i++) {
                this.wordElem.textContent += this.progress[i] + " ";
            }
            this.remainingElem.textContent = this.remaining;
            this.guessedElem.textContent = "";
            for(var i = 0; i < this.guessed.length; i++) {
                this.guessedElem.textContent += this.guessed[i] + " ";
            }
        },

        guessedCorrect: function(key) {
            for(var i = 0; i < this.word.length; i++) {
                if (this.word[i] === key) {
                    this.progress[i] = key;
                }
            }

            if (this.progress.indexOf("_") === -1) {
                this.wins++;
                this.reset();
            }
        },

        guessedIncorrect: function(key) {
            this.guessed.push(key);
            this.remaining--;
            if (this.remaining < 1) {
                this.reset();
            }
        },

        keyPressed: function(key) {
            if (this.guessed.indexOf(key) !== -1 || this.progress.indexOf(key) !== -1) {
                return;
            }

            if (this.beginElem.style.visibility === "visible") {
                this.beginElem.style.visibility = "hidden";
            }

            if (this.word.indexOf(key) !== -1) {
                this.guessedCorrect(key);
            } else {
                this.guessedIncorrect(key);
            }
            this.displayChange();
        },

        pickWord: function() {
            this.word = this.wordList[Math.floor(Math.random() * this.wordList.length)];
        },

        reset: function() {
            this.pickWord();
            this.progress = [];
            for(var i = 0; i < this.word.length; i++) {
                this.progress.push("_");
            }
            this.guessed = [];
            this.remaining = 10;
            this.beginElem.style.visibility = "visible";
            this.displayChange();
        }
    }

    game.reset();

    document.onkeypress = function(event) {
        game.keyPressed(event.key.toLowerCase());
    }
}