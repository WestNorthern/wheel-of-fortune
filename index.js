

const clueArray = ['quixotic'];


class Game {

  constructor(clueArr){

    this.clueArr = clueArray;
    this.clue = this.clueArr[0].split('');
    this.correctLetters = [];
    this.abcArr = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    this.clueLetters =  this.clue.filter(function(elem, index, self) 
    {
      return index == self.indexOf(elem); 
    }) // Eliminates duplicate letters for clue checker

  } // End of constructor

  checkIfWon(){
    if (this.correctLetters.length == this.clueLetters.length) {
      alert('You win!');
    }
    else {
      this.guessLetter();
    }
  } // End of checkIfWon method

  displayClue(){
    console.log(this.clue);
    console.log(this.clueArr);
    console.log(this.clueLetters);
  }

  guessLetter(){
    let letter = prompt('Guess a letter!');


    if(this.clue.includes(letter)){
      if(this.correctLetters.includes(letter)){
        alert("You've already guessed that letter!");
        this.guessLetter();
      }
      else{
      this.correctLetters.push(letter);
      }
    }
    this.checkIfWon();

  }




}








$(function() { // Document ready function
  
  let wof = new Game();

  wof.displayClue();
  wof.checkIfWon();


}); // End of Document Ready Function