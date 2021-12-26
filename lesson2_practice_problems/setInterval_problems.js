// problem 1

let counterId;

function startCounting() {
  let number = 0;

  counterId = setInterval(() => {
    number += 1;
    console.log(number);
  }, 1000);
}

// problem 2

function stopCounting() {
  clearInterval(counterId);
}
