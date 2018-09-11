window.onload = function() {
    var game = {
        wins: 0,
        remaining: 10,
        word: "",
        progress: [],
        guessed: [],
        wordList: ["html", "css", "javascript", "array", "function", "method", "variable", "string", "boolean", "object", "loop", "conditional", "agile", "bootstrap", "react"],
        wordsSolved: [],
        beginElem: document.getElementById("begin-label"),
        winElem: document.getElementById("wins-output"),
        wordElem: document.getElementById("word-output"),
        remainingElem: document.getElementById("remaining-output"),
        guessedElem: document.getElementById("guessed-output"),

        display: function(elem, val) {
            if (Array.isArray(val)) {
                elem.textContent = "";
                for(var i = 0; i < val.length; i++) {
                    elem.textContent += val[i] + " ";
                }
            } else {
                elem.textContent = val;
            }
        },

        guessedCorrect: function(key) {
            for(var i = 0; i < this.word.length; i++) {
                if (this.word[i] === key) {
                    this.progress[i] = key;
                }
            }
            this.display(this.wordElem, this.progress);

            if (this.progress.indexOf("_") === -1) {
                this.wins++;
                this.display(this.winElem, this.wins);
                this.solved();
                this.reset();
            }  
        },

        guessedIncorrect: function(key) {
            this.guessed.push(key);
            this.display(this.guessedElem, this.guessed);
            this.remaining--;
            this.display(this.remainingElem, this.remaining);
            if (this.remaining < 1) {
                this.reset();
            }
        },

        keyPressed: function(key) {
            if (this.guessed.indexOf(key) !== -1 || this.progress.indexOf(key) !== -1 || key.length > 1 || key.charCodeAt(0) < 97 || key.charCodeAt(0) > 122) {
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
            this.display(this.wordElem, this.progress);
            this.guessed = [];
            this.display(this.guessedElem, this.guessed);
            this.remaining = 10;
            this.display(this.remainingElem, this.remaining);
            this.beginElem.style.visibility = "visible";
        },

        solved: function() {
            if (this.wordList.length > 1) {
                this.wordsSolved = this.wordsSolved.concat(this.wordList.splice(this.wordList.indexOf(this.word), 1));
            } else {
                this.wordList = this.wordList.concat(this.wordsSolved.splice(0, this.wordsSolved.length));
                
            }
        }
    }

    game.reset();

    document.onkeypress = function(event) {
        game.keyPressed(event.key.toLowerCase());
    }
}