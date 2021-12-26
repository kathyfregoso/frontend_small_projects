class App {
  constructor() {
    this.icons = document.querySelectorAll("i");
    this.commands = {
      bold: () => document.execCommand("bold"),
      italic: () => document.execCommand("italic"),
      underline: () => document.execCommand("underline"),
      strikeThrough: () => document.execCommand("strikeThrough"),
      createLink: () =>
        document.execCommand("createLink", false, prompt("Enter URL")),
      insertUnorderedList: () => document.execCommand("insertUnorderedList"),
      insertOrderedList: () => document.execCommand("insertOrderedList"),
      justifyLeft: () => document.execCommand("justifyLeft"),
      justifyRight: () => document.execCommand("justifyRight"),
      justifyCenter: () => document.execCommand("justifyCenter"),
      justifyFull: () => document.execCommand("justifyFull"),
    };
  }

  init() {
    this.bindEvents();
  }

  clickHandler(event) {
    if (event.target.tagName !== "I") {
      return;
    }
    let command = event.target.dataset.command;
    this.commands[command]();
  }

  bindEvents() {
    this.icons.forEach((icon) => {
      icon.addEventListener("click", this.clickHandler.bind(this));
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let app = new App();
  app.init();
});
