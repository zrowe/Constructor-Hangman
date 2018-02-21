// Contains a constructor, Letter. This constructor should be able to either
// display an underlying character or a blank placeholder (such as an
// underscore), depending on whether or not the user has guessed the letter.

var Letter = function(character) {
    this.character = character; // the underlying character for the letter
    this.guessed = false; //that letter has been guessed yet

    // A function that takes a character as an argument and checks it against 
    // the underlying character, updating the stored boolean value to true if it was guessed correctly
    this.compare = function(userGuess) {
        if (this.character === userGuess) { this.guessed = true; return true };
        return false
    }
};

// A function that returns the underlying character if the letter has been 
//     guessed, or a placeholder (like an underscore) if the letter has not been guessed
Letter.prototype.toString = function() {
    var result = "_";
    if (this.guessed) { result = this.character };
    return result
};
module.exports = Letter;