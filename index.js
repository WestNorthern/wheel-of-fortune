

const phraseArray = [
                      {
                        phrase: '  naggers',
                        clue: 'People that annoy you'
                      },
                      {
                        phrase: ' fortune',
                        clue: 'Favors the bold'
                      },
                      {
                        phrase: 'schoolboy q',
                        clue: 'He will rearrange your kindle'
                      },
                      {
                        phrase: ' quixotic',
                        clue: 'Windmill Tilting'
                      },
                      {
                        phrase: ' jumping    spiders',
                        clue: 'Nope.'
                      },
                      {
                        phrase: ' black and   yellow',
                        clue: 'Wiz Khailfa Wicker Man'
                      },
                      {
                        phrase: ' finders      keepers',
                        clue: 'The Law'
                      },
                      {
                        phrase: ' changing    leaves',
                        clue: 'Loved by the Basic'
                      },
                    ];

let playerOne = {
                  money: 0,
                  name: 'Player One',
                  turn: true

                };

let playerTwo = {
                  money: 0,
                  name: 'Player Two',
                  turn: false

                };

let playerThree = {
                  money: 0,
                  name: 'Player Three',
                  turn: false

                };            




class Game {

  constructor(phraseArr){

    this.phraseArr = phraseArr[(Math.floor(Math.random() * phraseArr.length))];
    this.phrase = this.phraseArr.phrase.split('');
    this.noSpacePhrase =  this.phrase.filter(function(str) {
    return /\S/g.test(str);
    });
    this.correctLetters = [];
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
    console.log(this.phraseLetters);
    console.log(this.correctLetters);
  } // End of checkIfWon method

  displayPhrase(){
    $('#phrase-display').empty();

    for (var i = 0; i < 22; i++) {
      if (this.phrase[i] === ' ' || this.phrase[i] == undefined){
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

  startGame(){
    $('.cluebox').text(this.phraseArr.clue);
    this.displayPhrase();
    this.displayLetters();
  }




}








$(function() { // Document ready function
  

  $(document).on('click', '.abcs', function(){
    let letter = $(this).data('letter');
    wof.guessLetter(letter);
  })

  
  let wof = new Game(phraseArray);
  
  wof.startGame();



  // wof.displayClue();
  // wof.checkIfWon();
 


}); // End of Document Ready Function