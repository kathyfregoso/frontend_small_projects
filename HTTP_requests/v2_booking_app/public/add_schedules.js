let form = document.querySelector("form");
let fieldsetElement = document.querySelector("fieldset");
let addScheduleBtn = document.querySelector("#addSchedule");
let submitBtn = document.querySelector("#submit");
let scheduleCount = 1;

// populate drop down with staff names
function staffDropDown() {
  let selectElement = document.querySelector("select");
  let xhr = new XMLHttpRequest();
  let staffData = null;
  xhr.open("GET", "http://localhost:3000/api/staff_members");

  xhr.addEventListener("load", (event) => {
    staffData = JSON.parse(xhr.response);
    staffData.forEach((entry) => {
      let option = document.createElement("option");
      option.setAttribute("value", entry.id);
      option.textContent = entry.name;
      selectElement.append(option);
    });
  });
  xhr.send();
}

// generate additional forms to submit 1+ schedules
function addSchedule() {
  addScheduleBtn.addEventListener("click", () => {
    scheduleCount += 1;
    let newFieldset = fieldsetElement.cloneNode(true);
    let legend = newFieldset.querySelector("legend");

    legend.textContent = "Schedule " + scheduleCount;
    submitBtn.before(newFieldset);
  });
}

// reformate date string from xxxx-xx-xx to xx-xx-xx format
function parseDate(dateString) {
  let parts = dateString.split("-");
  return new Array(parts[1], parts[2], parts[0].slice(-2)).join("-");
}

// parse form data
function parseFormData() {
  let formData = { schedules: [] };
  let fieldsets = form.querySelectorAll("fieldset");
  [...fieldsets].forEach((schedule) => {
    let staff_id = schedule.querySelector("select").value;
    let date = parseDate(schedule.querySelector(".date").value);
    let time = schedule.querySelector(".time").value;
    formData.schedules.push({ staff_id, date, time });
  });
  return formData;
}

// handle form submission
function submitForm() {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let json = JSON.stringify(parseFormData());

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/api/schedules");
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.timeout = 5000;

    xhr.addEventListener("load", (event) => {
      if (xhr.status === 201) {
        alert(`Schedule(s) added!`);
        form.reset();
      } else if (xhr.status === 400) {
        alert(xhr.responseText);
      }
    });

    xhr.addEventListener("timeout", (event) => {
      alert("The request is taking too long, please try again.");
    });

    xhr.addEventListener("loadend", (event) => {
      alert("The request has completed");
    });
    xhr.send(json);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  staffDropDown();
  addSchedule();
  submitForm();
});
