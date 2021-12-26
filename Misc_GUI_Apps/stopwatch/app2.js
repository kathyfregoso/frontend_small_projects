class Timer {
  constructor(max, element, nextCounter, startValue = null) {
    this.element = element;
    this.max = max;
    this.nextCounter = nextCounter;
    this.value = startValue || 0;
    this.redraw();
  }

  increment() {
    this.value += 1;

    if (this.value === this.max) {
      this.value = 0;

      if (this.nextCounter) {
        this.nextCounter.increment();
      }
    }

    this.redraw();
  }

  redraw() {
    this.element.textContent = String(this.value).padStart(2, "0");
  }

  reset() {
    this.value = 0;
    this.redraw();
  }
}

class App {
  constructor() {
    this.elements = {
      buttons: document.getElementById("buttons"),
      startStopButton: document.getElementById("startStop"),
      hours: document.getElementById("hours"),
      minutes: document.getElementById("minutes"),
      seconds: document.getElementById("seconds"),
      centiseconds: document.getElementById("centiseconds"),
    };
    this.intervalId;
  }

  init() {
    this.createCounters();
    this.attachListeners();
  }

  startStopHandler() {
    let button = this.elements.startStopButton;

    if (button.textContent === "Start") {
      button.textContent = "Stop";

      this.intervalId = setInterval(() => {
        this.counters[0].increment();
      }, 10);
    } else {
      button.textContent = "Start";
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  resetHandler() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    this.elements.startStopButton.textContent = "Start";
    this.resetAllCounters();
  }

  attachListeners() {
    this.elements.buttons.addEventListener("click", (event) => {
      if (event.target.id === "startStop") {
        this.startStopHandler(this);
      } else if (event.target.id === "reset") {
        this.resetHandler(this);
      }
    });
  }

  createCounters() {
    let hourCounter = new Timer(100, this.elements.hours);
    let minuteCounter = new Timer(60, this.elements.minutes, hourCounter);
    let secondCounter = new Timer(60, this.elements.seconds, minuteCounter);
    let centisecondCounter = new Timer(
      100,
      this.elements.centiseconds,
      secondCounter
    );

    this.counters = [
      centisecondCounter,
      secondCounter,
      minuteCounter,
      hourCounter,
    ];
  }

  resetAllCounters() {
    this.counters.forEach((counter) => counter.reset());
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let app = new App();
  app.init();
});
