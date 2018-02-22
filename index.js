var prompt = require('prompt');
var Word = require("./word.js");
var colors = require('colors/safe');
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
            pattern: /^[a-zA-Z]+$/,
            message: 'Sorry, only a single letter (a-z) is allowed',
            required: true,
            maxLength: 1
        }
    }
};

function getGuess() {

    if (myGuesses.remaining > 0) {

        prompt.get(schema, function(err, result) {
            if (err) { console.log(err); };
            var char = result.letter.toLowerCase() // flatten the input
            if (mySecretWord.guess(char)) {
                console.log("Correct\n".green);
            } else {
                console.log("Incorrect\n".red);
                myGuesses.update(char);
                console.log("You have chosen these letters badly: " + myGuesses.missList.split("").join(":"));
                console.log("You have " + myGuesses.remaining + " guesses remaining\n");
            }
            console.log("\t" + mySecretWord.getDisplay() + "\n");
            if (mySecretWord.getDisplay().includes("_")) {
                getGuess();
            } else {
                console.log("\u0007You Guessed It!".rainbow);
            };

        });
    };
}


// Initialize
var wins = 0;
var loses = 0;
var myGuesses = new GuessTracker();

// TODO:  Randomly selects a word and uses the Word constructor to store it
var mySecretWord = new Word("xyzzy"); // store in constructor
console.log("\t" + mySecretWord.getDisplay() + "\n"); // show initial pattern
getGuess();


// https://nlp.fi.muni.cz/projekty/random_word/run.cgi?language_selection=en&word_selection=nouns&model_selection=norm&length_selection=8&probability_selection=true
// request('http://www.google.com', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });