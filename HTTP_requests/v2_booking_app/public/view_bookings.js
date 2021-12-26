function getBookings() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:3000/api/bookings");
  xhr.responseType = "json";
  let dates;

  xhr.addEventListener("load", (event) => {
    dates = xhr.response;
    let list = document.querySelector(".bookings_list");

    dates.forEach((date) => {
      let li = document.createElement("li");
      li.textContent = date;
      list.appendChild(li);
    });

    list.addEventListener("click", (event) => {
      let child = document.createElement("ul");

      let appts = new XMLHttpRequest();
      let date = event.target.textContent;
      appts.open("GET", "http://localhost:3000/api/bookings/" + String(date));
      appts.responseType = "json";

      appts.addEventListener("load", (e) => {
        let data = appts.response;
        let schedules = viewBookingInfo(data);
        schedules.forEach((schedule) => {
          let childLi = document.createElement("li");
          childLi.textContent = schedule;
          child.appendChild(childLi);
        });
        event.target.appendChild(child);
      });
      appts.send();
    });
  });

  xhr.send();
}

function viewBookingInfo(data) {
  let bookings = data.map((schedule) => {
    return `${schedule[0]} | ${schedule[1]} | ${schedule[2]}`;
  });
  return bookings;
}

getBookings();
