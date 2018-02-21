var prompt = require('prompt');
var Word = require("./word.js");

// Randomly selects a word and uses the Word constructor to store it


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


var count = 3;

function getGuess() {

    if (count > 0) {
        prompt.get(schema, function(err, result) {
            if (secretWord.guess(result.letter.toLowerCase())) {
                console.log("Correct");
            } else {
                console.log("Incorrect");
            }
            console.log(secretWord.getDisplay());
            count--;
            getGuess();
        });
    }
}


// Initialize
var wins = 0;
var loses = 0;

var guesses = {
    allowed: 10,
    remaining: 0,
    missList: ""
}

var count = 3;

var secretWord = new Word("xyzzy"); // store in constructor

getGuess();