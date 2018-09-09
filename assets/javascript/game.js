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
            if (this.progress.length === 0 && this.guessed.length === 0) {
                this.beginElem.visibility = "visible";
            } else {
                this.beginElem.visibility = "hiddem";
            }
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

        keyPressed: function(key) {
            if (this.guessed.indexOf(key) !== -1 || this.progress.indexOf(key) !== -1) {
                return;
            }
            if (this.word.indexOf(key) !== -1) {
                for(var i = 0; i < this.word.length; i++) {
                    if (this.word[i] === key) {
                        this.progress[i] = key;
                    }
                }
                if (this.progress.indexOf("_") === -1) {
                    this.wins++;
                    this.reset();
                }
            } else {
                this.guessed.push(key);
                this.remaining--;
                if (this.remaining < 1) {
                    this.reset();
                }
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
            this.displayChange();
        }
    }

    game.reset();

    document.onkeypress = function(event) {
        game.keyPressed(event.key.toLowerCase());
    }
}