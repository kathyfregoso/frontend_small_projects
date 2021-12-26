function callback1() {
  console.log("callback1");
}

function callback2() {
  console.log("callback2");
}

function callback3() {
  console.log("callback3");
}

function randomizer(...callbacks) {
  if (callbacks.length < 1) return;

  let max = callbacks.length * 2;
  let second = 0;

  const timeLogger = setInterval(() => {
    second += 1;
    console.log(second);

    if (second >= max) {
      clearInterval(timeLogger);
    }
  }, 1000);

  callbacks.forEach((cb) => {
    let delay = Math.floor(Math.random() * max * 1000);
    setTimeout(cb, delay);
  });
}

console.log(randomizer(callback1, callback2, callback3));

// Output:
// 1
// 2
// "callback2"
// 3
// "callback3"
// 4
// 5
// "callback1"
// 6
