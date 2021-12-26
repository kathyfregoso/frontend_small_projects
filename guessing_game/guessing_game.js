document.addEventListener("DOMContentLoaded", () => {
  let answer = Math.floor(Math.random() * 100) + 1;
  let form = document.querySelector("form");
  let input = document.getElementById("guess");
  let link = document.querySelector("a");
  let displayMessage = document.querySelector("p");

  function newGame() {
    answer = Math.floor(Math.random() * 100) + 1;
    displayMessage.textContent = "Guess a number between 1 and 100.";
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let guess = parseInt(input.value, 10);
    let message;

    if (guess === answer) {
      message = `${String(guess)} is correct!`;
    } else if (guess > answer) {
      message = `The answer is lower than ${String(guess)}.`;
    } else if (guess < answer) {
      message = `The answer is higher than ${String(guess)}.`;
    }

    displayMessage.textContent = message;
  });

  link.addEventListener("click", (event) => {
    event.preventDefault();
    newGame();
  });

  newGame();
});
