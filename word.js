var Letter = require("./letter.js");


// Word.js: Contains a constructor, Word that depends on the Letter constructor. 
// This is used to create an object representing the current word the user is attempting to guess. 
// That means the constructor should define:

var Word = function(secretWord) {

    this.word = []; // Letter objects representing the letters of the underlying word
    for (var i = 0; i < secretWord.length; i++) {
        this.word.push(new Letter(secretWord[i]));
    };

    // A function that returns a string representing the word known to date.
    this.getDisplay = function() {
        var str = this.word.join(" "); // put a space between each letter of the word
        return str
    };
    // A function that takes a character as an argument and calls the guess function on each 
    //     letter object (the second function defined in Letter.js)
    this.guess = function(character) {
    	var result = false;
        for (i = 0; i < this.word.length; i++) {
            if (this.word[i].compare(character)) {result = true;};
        }
        return result // return true if at least one match was found 
    };
}
module.exports = Word;