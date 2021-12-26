document.addEventListener("DOMContentLoaded", (event) => {
  let message = document.querySelector("#message");
  let letters = document.querySelector("#spaces");
  let guesses = document.querySelector("#guesses");
  let apples = document.querySelector("#apples");
  let replay = document.querySelector("#replay");
  const MAX_GUESSES = 6;

  let randomWord = (function () {
    let words = ["apple", "banana", "orange", "pear"];

    return function () {
      let word = words[Math.floor(Math.random() * words.length)];
      words.splice(words.indexOf(word), 1);
      return word;
    };
  })();

  class Game {
    constructor() {
      this.incorrect = 0;
      this.guessedLetters = [];
      this.correctSpaces = 0;
      this.word = randomWord();
      if (this.word === undefined) {
        this.displayMessage(`Sorry, I've run out of words!`);
        this.hideReplayLink();
        return this;
      }
      this.word = this.word.split("");
      this.init();
    }

    createBlanks() {
      let spaces = new Array(this.word.length + 1).join("<span></span>");
      let spans = letters.querySelectorAll("span");
      spans.forEach((span) => {
        span.parentNode.removeChild(span);
      });
      letters.insertAdjacentHTML("beforeend", spaces);
      this.spaces = document.querySelectorAll("#spaces span");
    }

    fillBlanksFor(letter) {
      let self = this;

      this.word.forEach((ltr, idx) => {
        if (letter === ltr) {
          self.spaces[idx].textContent = letter;
          self.correctSpaces += 1;
        }
      });
    }

    emptyGuesses() {
      let spans = guesses.querySelectorAll("span");
      spans.forEach((span) => {
        span.parentNode.removeChild(span);
      });
    }

    renderGuess(letter) {
      let span = document.createElement("span");
      span.textContent = letter;
      guesses.append(span);
    }

    renderIncorrectGuess(letter) {
      this.incorrect += 1;
      this.renderGuess(letter);
      this.setClass();
    }

    duplicateGuess(letter) {
      let duplicate = this.guessedLetters.indexOf(letter) !== -1;
      if (!duplicate) {
        this.guessedLetters.push(letter);
      }

      return duplicate;
    }

    setClass() {
      apples.classList.remove(...apples.classList);
      apples.classList.add(`guess_${this.incorrect}`);
    }

    displayMessage(text) {
      message.textContent = text;
    }

    showReplayLink() {
      replay.classList.add("visible");
    }

    hideReplayLink() {
      replay.classList.remove("visible");
    }

    processGuess(event) {
      let letter = event.key;
      if (notALetter(letter)) {
        return;
      }

      if (this.duplicateGuess(letter)) {
        return;
      }

      if (this.word.includes(letter)) {
        this.fillBlanksFor(letter);
        this.renderGuess(letter);
      }

      if (this.correctSpaces === this.spaces.length) {
        this.win();
      } else {
        this.renderIncorrectGuess(letter);
      }

      if (this.incorrect === MAX_GUESSES) {
        this.lose();
      }
    }

    win() {
      this.unbind();
      this.displayMessage("You win!");
      this.showReplayLink();
      this.setGameStatus();
    }

    lose() {
      this.unbind();
      this.displayMessage(`You're out of guesses - game over!`);
      this.showReplayLink();
      this.setGameStatus("lose");
    }

    setGameStatus(status) {
      document.body.classList.remove("win", "lose");

      if (status) {
        document.body.classList.add(status);
      }
    }

    bind() {
      this.processGuessHandler = (event) => this.processGuess(event);
      document.addEventListener("keyup", this.processGuessHandler);
    }

    unbind() {
      document.removeEventListener("keyup", this.processGuessHandler);
    }

    init() {
      this.bind();
      this.setClass();
      this.hideReplayLink();
      this.emptyGuesses();
      this.createBlanks();
      this.setGameStatus();
      this.displayMessage("");
    }
  }

  function notALetter(letter) {
    return letter < "a" || letter > "z";
  }

  let newGame = new Game();
  newGame.init();

  replay.addEventListener("click", (event) => {
    event.preventDefault();
    let newGame = new Game();
    newGame.init();
  });
});
