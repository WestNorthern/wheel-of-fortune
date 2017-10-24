

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





class Game {

  constructor(phraseArr){
    this.playerOne = {
                  money: 0,
                  name: 'Player One',
                  turn: false

                };

    this.playerTwo = {
                  money: 0,
                  name: 'Player Two',
                  turn: false

                };

    this.playerThree = {
                  money: 0,
                  name: 'Player Three',
                  turn: false

                };            


    this.phraseArr = phraseArr[(Math.floor(Math.random() * phraseArr.length))];
    this.phrase = this.phraseArr.phrase.split('');
    this.noSpacePhrase =  this.phrase.filter(function(str) {
    return /\S/g.test(str);
    }); // Filters out all of the white space
    this.correctLetters = [];
    this.incorrectLetters = [];
    this.abcArr = ['b','c','d','f','g','h','j','k','l','m','n','p','q','r','s','t','v','w','x','y','z'];
    this.vowArr = ['a', 'e', 'i', 'o', 'u'];
    this.phraseLetters =  this.noSpacePhrase.filter(function(elem, index, self) 
    {
      return index == self.indexOf(elem); 
    }); // Eliminates duplicate letters for clue checker

  } // End of constructor

  checkIfWon(){
    if (this.correctLetters.length == this.phraseLetters.length) {
      alert(`${this.returnCurrentPlayer()} has solved the puzzle!`);
    }
    else{
      this.displayPhrase();
    }
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
      }
      else{
        this.correctLetters.push(letter);
        this.addMoney();

      }

    }

    if (this.phraseLetters.includes(letter) === false) {
      
       this.incorrectLetters.push(letter);
       console.log(this.incorrectLetters);
       this.subtractMoney();
       this.changePlayer();
       this.displayPhrase();
       this.displayLetters();
       this.displayMoney();
       console.log('incorrect')

    }
 
    this.displayPhrase();
    this.displayLetters();
    this.checkIfWon();
    this.displayMoney();
    

  }

  displayLetters() {
    $('#letters-list').empty();
    $('#vowels-list').empty();

    for (var i = 0; i < this.abcArr.length; i++) {
      if (this.correctLetters.includes(this.abcArr[i])){
        $('#letters-list').append(`<div class="col abcs" data-letter="${this.abcArr[i]}" style="background: black; color: lime;"> ${this.abcArr[i].toUpperCase()}</div>`);
      }
      else if (this.incorrectLetters.includes(this.abcArr[i])) {
        $('#letters-list').append(`<div class="col abcs" data-letter="${this.abcArr[i]}" style="background: black; color: red;"> ${this.abcArr[i].toUpperCase()}</div>`);
      }
      else {
        $('#letters-list').append(`<div class="col abcs" data-letter="${this.abcArr[i]}"> ${this.abcArr[i].toUpperCase()}</div>`);
      }
    }

    for (var i = 0; i < this.vowArr.length; i++) {
      if (this.correctLetters.includes(this.vowArr[i])){
        $('#vowels-list').append(`<div class="col vowels" data-letter="${this.vowArr[i]}" style="background: black; color: lime;"> ${this.vowArr[i].toUpperCase()}</div>`);
      }
      else if (this.incorrectLetters.includes(this.vowArr[i])) {
        $('#vowels-list').append(`<div class="col vowels" data-letter="${this.vowArr[i]}" style="background: black; color: red;"> ${this.vowArr[i].toUpperCase()}</div>`);
      }
      else {
        $('#vowels-list').append(`<div class="col vowels" data-letter="${this.vowArr[i]}"> ${this.vowArr[i].toUpperCase()}</div>`);
      }
    }
  }

  startGame(){
    $('.cluebox').text(this.phraseArr.clue);
    this.playerOne.turn = true;
    this.displayPhrase();
    this.displayLetters();
    this.displayMoney();
    
  }

  displayMoney(){
    $('.players').empty();
    $('.players').append(`<div class="col-4 player">Player: ${this.playerOne.name}</br> Money: $ ${this.playerOne.money}</br> Turn: ${this.playerOne.turn}`)
    $('.players').append(`<div class="col-4 player">Player: ${this.playerTwo.name}</br> Money: $ ${this.playerTwo.money}</br> Turn: ${this.playerTwo.turn}`)
    $('.players').append(`<div class="col-4 player">Player: ${this.playerThree.name}</br> Money: $ ${this.playerThree.money}</br> Turn: ${this.playerThree.turn}`)

  }

  changePlayer(){
    if (this.playerOne.turn === true && this.playerTwo.turn === false && this.playerThree.turn === false){
      this.playerOne.turn = false;
      this.playerTwo.turn = true;
      this.playerThree.turn = false;
      console.log('changed');
    }
    else if (this.playerTwo.turn === true && this.playerThree.turn === false && this.playerOne.turn === false){
      this.playerOne.turn = false;
      this.playerTwo.turn = false;
      this.playerThree.turn = true;
      console.log('overflow');
    }
    else if (this.playerThree.turn === true && this.playerOne.turn === false && this.playerTwo.turn === false){
      this.playerOne.turn = true;
      this.playerTwo.turn = false;
      this.playerThree.turn = false;
    }
  }

  addMoney(){
    if (this.playerOne.turn === true){
      this.playerOne.money += 200;
    }
    else if (this.playerTwo.turn === true){
      this.playerTwo.money += 200;
    }
    else if (this.playerThree.turn === true){
      this.playerThree.money += 200;
    }
  }

  subtractMoney(){
    if (this.playerOne.turn === true){
      this.playerOne.money -= 200;
    }
    else if (this.playerTwo.turn === true){
      this.playerTwo.money -= 200;
    }
    else if (this.playerThree.turn === true){
      this.playerThree.money -= 200;
    }
  }

  returnCurrentPlayer(){
    if (this.playerOne.turn === true && this.playerTwo.turn === false && this.playerThree.turn === false){
      return this.playerOne.name;
    }
    else if (this.playerTwo.turn === true && this.playerThree.turn === false && this.playerOne.turn === false){
      return this.playerTwo.name;
    }
    else if (this.playerThree.turn === true && this.playerOne.turn === false && this.playerTwo.turn === false){
      return this.playerThree.name;
    }
  }

}








$(function() { // Document ready function
  

  $(document).on('click', '.abcs', function(){
    let letter = $(this).data('letter');
    wof.guessLetter(letter);
  })

  $(document).on('click', '.vowels', function(){
    let letter = $(this).data('letter');
    wof.guessLetter(letter);
  })
  
  let wof = new Game(phraseArray);
  
  wof.startGame();



  // wof.displayClue();
  // wof.checkIfWon();
 


}); // End of Document Ready Function