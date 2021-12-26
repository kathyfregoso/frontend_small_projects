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
          message = "Password must be at least 10 characters.";
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
  let span = event.target.nextElementSibling;
  span.classList.add("hidden");
  event.target.classList.add("valid");
}

function blurEvent(event) {
  let field = event.target;
  let span = field.nextElementSibling;

  if (field.validity.valid === true) {
    // change borders for valid input
    field.classList.add("valid");
    field.classList.remove("invalid");
    span.classList.remove("invalid");

    // hide form error message if all inputs are now valid
    if (allInputsValid()) {
      document.querySelector("#form_submit_error").classList.add("hidden");
    }
  } else {
    // change border of input
    field.classList.add("invalid");
    field.classList.remove("valid");

    // create context object for message creation
    let errorContext = {
      patternMismatch: field.validity.patternMismatch,
      tooShort: field.validity.tooShort,
      valueMissing: field.validity.valueMissing,
    };
    // insert text into span and give border
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

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("focus", focusEvent);
  });

  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("blur", blurEvent);
  });

  let form = document.querySelector("form");

  form.addEventListener("submit", submitEvent);
});
