function getSchedules() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:3000/api/schedules");
  xhr.responseType = "json";
  xhr.timeout = 5000;

  xhr.addEventListener("load", (event) => {
    let data = xhr.response;
    logAvailability(data);
  });

  xhr.addEventListener("timeout", (event) => {
    alert("The request is taking too long, please try again.");
  });

  xhr.addEventListener("loadend", (event) => {
    alert("The request has completed");
  });

  xhr.send();
}

function logAvailability(data) {
  let openSchedules = {};
  data.forEach((schedule) => {
    let staffMember = `staff ${schedule["staff_id"]}`;
    if (!openSchedules[staffMember]) {
      openSchedules[staffMember] = 1;
    } else if (openSchedules[staffMember]) {
      openSchedules[staffMember] += 1;
    }
  });

  let message = Object.keys(openSchedules)
    .map((staff) => `${staff}: ${openSchedules[staff]}`)
    .join("\n");

  if (message) {
    alert(message);
  } else {
    alert("All schedules are booked.");
  }
}
