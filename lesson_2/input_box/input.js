let cursorInterval;
let focusedTextField;

document.addEventListener("DOMContentLoaded", () => {
  let textField = document.querySelector(".text-field");

  textField.addEventListener("click", (event) => {
    event.stopPropagation();
    focusedTextField = textField;
    textField.classList.add("focused");

    if (!cursorInterval) {
      cursorInterval = setInterval(() => {
        textField.classList.toggle("cursor");
      }, 500);
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (focusedTextField) {
    let textInput = event.key;
    let content = document.querySelector(".content");

    if (textInput === "Backspace") {
      content.textContent = content.textContent.slice(
        0,
        content.textContent.length - 1
      );
    } else if (textInput.length === 1) {
      content.textContent = content.textContent + textInput;
    }
  }
});

document.addEventListener("click", (event) => {
  clearInterval(cursorInterval);
  if (focusedTextField) {
    focusedTextField.classList.remove("focused");
    focusedTextField.classList.remove("cursor");
    focusedTextField = null;
  }
});
