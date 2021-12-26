function bookingListTemplate(data) {
  const li = document.createElement("li");
  li.textContent = data;
  return li;
}

function bookingDetailsTemplate(data) {
  const ulEle = document.createElement("ul");
  data.forEach(({ staffName, studentEmail, time }) => {
    const li = document.createElement("li");
    li.textContent = `${staffName} | ${studentEmail} | ${time}`;
    ulEle.appendChild(li);
  });

  return ulEle;
}

function renderBookingDetails(node, bookings) {
  const bookingsObject = bookings.map((booking) => ({
    staffName: booking[0],
    studentEmail: booking[1],
    time: booking[2],
  }));

  node.appendChild(bookingDetailsTemplate(bookingsObject));
}

document
  .querySelector("#bookings-list")
  .addEventListener("click", ({ target }) => {
    if (target.tagName === "LI") {
      if (target.childElementCount === 0) {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", `/api/bookings/${target.textContent}`);
        xhr.responseType = "json";
        xhr.send();
        xhr.addEventListener("load", () => {
          data = xhr.response;
          renderBookingDetails(target, data);
        });
      }
    }
  });

(() => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/api/bookings");
  xhr.responseType = "json";
  xhr.send();
  xhr.addEventListener("load", () => {
    const data = xhr.response;
    const bookingList = document.querySelector("#bookings-list");
    data.forEach((date) => {
      bookingList.appendChild(bookingListTemplate(date));
    });
  });
})();
