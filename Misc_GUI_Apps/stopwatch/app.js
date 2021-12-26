// document.addEventListener("DOMContentLoaded", () => {
//   class Stopwatch {
//     constructor() {
//       this.toggleButton = document.querySelector(".toggle");
//       this.resetButton = document.querySelector(".reset");
//       this.isOn = false;
//       this.centiSecs = 0;
//       this.seconds = 0;
//       this.minutes = 0;
//       this.hours = 0;
//       this.interval = null;
//       this.spanCentiSecs = document.querySelector(".centiSecs");
//       this.spanSeconds = document.querySelector(".secs");
//       this.spanMinutes = document.querySelector(".mins");
//       this.spanHours = document.querySelector(".hours");
//       // this.bindEvents();
//     }

//     init() {
//       this.bindEvents();
//     }

//     startStopHandler() {
//       return this.isOn ? this.stop() : this.start();
//     }

//     addTime() {
//       this.centiSecs += 1;

//       if (this.centiSecs === 100) {
//         this.centiSecs = 0;
//         this.seconds += 1;

//         if (this.seconds === 60) {
//           this.seconds = 0;
//           this.minutes += 1;

//           if (this.minutes === 60) {
//             this.minutes = 0;
//             this.hours += 1;
//           }
//         }
//       }

//       this.displayTime();
//     }

//     displayTime() {
//       this.spanCentiSecs.innerText =
//         this.centiSecs < 10 ? "0" + this.centiSecs : String(this.centiSecs);
//       this.spanSeconds.innerText =
//         this.seconds < 10 ? "0" + this.seconds : String(this.seconds);
//       this.spanMinutes.innerText =
//         this.minutes < 10 ? "0" + this.minutes : String(this.minutes);
//       this.spanHours.innertext =
//         this.hours < 10 ? "0" + this.hours : String(this.hours);
//     }

//     reset() {
//       this.isOn && this.stop();
//       this.centiSecs = 0;
//       this.seconds = 0;
//       this.minutes = 0;
//       this.hours = 0;
//       this.displayTime();
//     }

//     start() {
//       this.interval = setInterval(this.addTime.bind(this), 10);
//       this.toggleButton.textContent = "Stop";
//       this.isOn = true;
//     }

//     stop() {
//       clearInterval(this.interval);
//       this.toggleButton.textContent = "Start";
//       this.isOn = false;
//     }

//     bindEvents() {
//       this.toggleButton.addEventListener(
//         "click",
//         this.startStopHandler.bind(this)
//       );
//       this.resetButton.addEventListener("click", this.reset.bind(this));
//     }
//   }

//   let app = new Stopwatch();
//   app.init();
// });
