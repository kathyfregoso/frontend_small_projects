function createErrorMessage(errorContext) {
  let message;
  let errors = Object.keys(errorContext);

  errors.forEach((errorType) => {
    if (errorContext[errorType]) {
      switch (errorType) {
        case "valueMissing":
          message = "This value is required.";
          break;
        case "tooShort":
          message = "Not enough characters.";
          break;
        case "patternMismatch":
          message = "Invalid input format.";
          break;
      }
    }
  });

  return message;
}

function allInputsValid() {
  let inputs = document.querySelectorAll("input");
  let allValid = true;

  inputs.forEach((input) => {
    if (input.validity.valid === false) {
      allValid = false;
    }
  });

  return allValid;
}

function focusEvent(event) {
  let span = !event.target.classList.contains("credit")
    ? event.target.nextElementSibling
    : event.target.parentElement.lastElementChild;
  span.classList.add("hidden");
  event.target.classList.add("valid");
}

function blurEvent(event) {
  let field = event.target;
  let span = field.nextElementSibling;

  if (field.validity.valid === true) {
    field.classList.add("valid");
    field.classList.remove("invalid");
    span.classList.remove("invalid");

    if (allInputsValid()) {
      document.querySelector("#form_submit_error").classList.add("hidden");
    }
  } else {
    field.classList.add("invalid");
    field.classList.remove("valid");

    let errorContext = {
      patternMismatch: field.validity.patternMismatch,
      tooShort: field.validity.tooShort,
      valueMissing: field.validity.valueMissing,
    };

    span.textContent = createErrorMessage(errorContext);
    span.classList.add("invalid");
    span.classList.remove("hidden");
  }
}

function submitEvent(event) {
  event.preventDefault();

  if (!allInputsValid()) {
    document.querySelector("#form_submit_error").classList.remove("hidden");
  } else {
    let request = new XMLHttpRequest();
    request.open("POST", form.action);
    let data = new FormData(form);

    request.send(data);
  }
}

function keyPressEvent(event) {
  let inputChar = event.key;

  if (event.target.classList.contains("credit")) {
    if (/[^0-9]+/g.test(inputChar)) {
      event.preventDefault();
    } else {
      event.target.textContent += inputChar;
    }
  }

  if (event.target.id === "first_name" || event.target.id === "last_name") {
    if (/[^a-z'\s]+/gi.test(inputChar)) {
      event.preventDefault();
    } else {
      event.target.textContent += inputChar;
    }
  }
}

function keyUpEvent(event) {
  if (event.target.value.length === 4 && event.target.id) {
    event.target.nextElementSibling.focus();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("focus", focusEvent);
    input.addEventListener("blur", blurEvent);
  });

  let form = document.querySelector("form");

  form.addEventListener("keypress", keyPressEvent);
  form.addEventListener("keyup", keyUpEvent);

  form.addEventListener("submit", submitEvent);
});
