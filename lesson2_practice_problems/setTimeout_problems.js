// problem 1

function logIt(number) {
  return () => console.log(number);
}

function delayLog() {
  let number = 1;
  while (number <= 10) {
    setTimeout(logIt(number), number * 1000);
    number += 1;
  }
}

// delayLog();

// problem 2

// setTimeout(() => {
//   // 1
//   console.log("Once"); // 5
// }, 1000);

// setTimeout(() => {
//   // 2
//   console.log("upon"); // 7
// }, 3000);

// setTimeout(() => {
//   // 3
//   console.log("a"); // 6
// }, 2000);

// setTimeout(() => {
//   // 4
//   console.log("time"); // 8
// }, 4000);

// problem 3

setTimeout(() => {
  setTimeout(() => {
    q(); // 7
  }, 15);

  d(); // 3

  setTimeout(() => {
    n();
  }, 5); // 5

  z(); // 4
}, 10);

setTimeout(() => {
  s(); //6
}, 20);

setTimeout(() => {
  f(); // 2
});

g(); // 1

// problem 4

function afterNSeconds(callback, seconds) {
  setTimeout(callback, seconds * 1000);
}
