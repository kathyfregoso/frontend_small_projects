function cancellationEvent(type, method) {
  return function (id) {
    let request = new XMLHttpRequest();
    request.open(method, `http://localhost:3000/api/${type}/${id}`);
    request.send();
    request.addEventListener("load", (event) => {
      if (request.status === 204) {
        alert("Successfully cancelled");
      } else {
        alert(request.responseText);
      }
    });
  };
}

const cancelBooking = cancellationEvent("bookings", "PUT");
const cancelSchedule = cancellationEvent("schedules", "DELETE");
