var prompt = require('prompt');
var Word = require("./word.js");
var colors = require('colors');
var banner = require('simple-banner');

banner.set("The Amazing Constructor-Hangman", "Cobbled together by zrowe", 0);


function GuessTracker() {
    this.allowed = 10;
    this.remaining = this.allowed;
    this.missList = "";
    this.update = function(char) {
        if (!this.missList.includes(char)) { // check if character is in miss list. 
            this.missList = this.missList + char; // add char to the miss list
            this.remaining--; //decrement remaining
        }
    }
}

prompt.start();
prompt.message = "";
prompt.delimiter = "";

var schema = {
    properties: {
        letter: {
            description: 'Guess a letter!',
            type: 'string',
            pattern: /^[a-zA-Z\s]+$/,
            message: 'Sorry, only a single letter (a-z) or space is allowed',
            required: true,
            maxLength: 1
        }
    }
};

function getGuess() {

    if (myGuesses.remaining > 0) {

        prompt.get(schema, function(err, result) {
            if (err) { console.log(err); process.exit() };
            var char = result.letter.toLowerCase()
            if (mySecretWord.guess(char)) {
                console.log("Correct".green);
            } else {
                console.log("Incorrect".red);
                myGuesses.update(char);
                console.log("You have chosen these letters badly: " + myGuesses.missList);
                console.log("You have " + myGuesses.remaining + " guesses remaining");
            }
            console.log(mySecretWord.getDisplay());
            if (mySecretWord.getDisplay().includes("_")) {
                getGuess();
            } else {
                console.log("You won!".rainbow);
            };

        });
    };
}


// Initialize
var wins = 0;
var loses = 0;
var myGuesses = new GuessTracker();
// Randomly selects a word and uses the Word constructor to store it
var mySecretWord = new Word("xyzzy"); // store in constructor



console


getGuess();