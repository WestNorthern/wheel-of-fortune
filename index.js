

const phraseArray = ['for tune'];


class Game {

  constructor(phraseArr){

    this.phraseArr = phraseArr;
    this.phrase = this.phraseArr[0].split('');
    this.noSpacePhrase =  this.phrase.filter(function(str) {
    return /\S/.test(str);
    });
    this.correctLetters = ['n', 't'];
    this.incorrectLetters = [];
    this.abcArr = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    this.phraseLetters =  this.noSpacePhrase.filter(function(elem, index, self) 
    {
      return index == self.indexOf(elem); 
    }); // Eliminates duplicate letters for clue checker

  } // End of constructor

  checkIfWon(){
    if (this.correctLetters.length == this.phraseLetters.length) {
      alert('You win!');
    }
    else{
      this.displayPhrase();
    }
  } // End of checkIfWon method

  displayPhrase(){
    $('#phrase-display').empty();

    for (var i = 0; i < this.phrase.length; i++) {
      if (this.phrase[i] === ' '){
        $('#phrase-display').append('<div class="col-1 phrase-letter" style="background: black;"></div>');
      }
      else if (this.correctLetters.includes(this.phrase[i])){
        $('#phrase-display').append(`<div class="col-1 phrase-letter">${this.phrase[i]}</div>`);
      }
      else {
        $('#phrase-display').append(`<div class="col-1 phrase-letter"></div>`);
      }
    }
  }

  guessLetter(letter){


    if(this.phrase.includes(letter)){
      if(this.correctLetters.includes(letter)){
        alert("You've already guessed that letter!");
        this.guessLetter();
      }
      else{
      this.correctLetters.push(letter);
      }
    }

    if (this.phrase.includes(letter) == false) {
      this.incorrectLetters.push(letter);
    }
    this.displayPhrase();
    this.displayLetters();
    this.checkIfWon();
    

  }

  displayLetters() {
    $('#letters-list').empty();

    for (var i = 0; i < this.abcArr.length; i++) {
      if (this.correctLetters.includes(this.abcArr[i]) || this.incorrectLetters.includes(this.abcArr[i])){
        $('#letters-list').append(`<div class="col-1 abcs" data-letter="${this.abcArr[i]}" style="background: black; color: red;"> ${this.abcArr[i].toUpperCase()}</div>`);
      }
      else {
      $('#letters-list').append(`<div class="col-1 abcs" data-letter="${this.abcArr[i]}"> ${this.abcArr[i].toUpperCase()}</div>`);
      }
    }
  }




}








$(function() { // Document ready function
  

  $(document).on('click', '.abcs', function(){
    let letter = $(this).data('letter');
    wof.guessLetter(letter);
  })

  let wof = new Game(phraseArray);



  // wof.displayClue();
  // wof.checkIfWon();
  wof.displayPhrase();
  wof.displayLetters();


}); // End of Document Ready Function