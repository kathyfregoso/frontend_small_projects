function createSchedulesSelection(select) {
  function createOption(schedule, staff) {
    let option = document.createElement("option");
    option.setAttribute("value", schedule.id);
    option.innerText =
      staff.find((member) => member.id === schedule.id).name +
      " | " +
      schedule.date +
      " | " +
      schedule.time;
    return option;
  }

  select.innerHTML = ""; // Clear out existing before generating new select menu

  let freeSchedules;
  let staff;

  let schedulesRequest = new XMLHttpRequest();
  schedulesRequest.open("GET", "/api/schedules");

  let staffRequest = new XMLHttpRequest();
  staffRequest.open("GET", "/api/staff_members");

  schedulesRequest.onloadend = () => {
    staffRequest.send();
  };

  staffRequest.onloadend = () => {
    freeSchedules = JSON.parse(schedulesRequest.response).filter(
      (schedule) => !schedule.student_email
    );
    staff = JSON.parse(staffRequest.response);

    freeSchedules.forEach((schedule) => {
      let option = createOption(schedule, staff);
      select.append(option);
    });

    document.getElementById("pleaseWait").classList.toggle("hidden");
    select.classList.toggle("hidden");
  };

  schedulesRequest.send();
}

function updateForm(form) {
  form.reset();
  let select = document.getElementById("schedules");
  select.classList.toggle("hidden");
  document.getElementById("pleaseWait").classList.toggle("hidden");
  createSchedulesSelection(select);
}

function handleBookingSubmission(form) {
  let data = new FormData(form);

  let submitRequest = new XMLHttpRequest();
  submitRequest.open("POST", "/api/bookings");

  submitRequest.onloadend = () => {
    if (submitRequest.status === 204) {
      alert("Booked");
      updateForm(form);
    }

    if (
      (submitRequest.status === 404) &
      submitRequest.responseText.startsWith("Student")
    ) {
      alert(submitRequest.responseText);
      document.getElementById("studentFormEmail").value =
        document.getElementById("bookingFormEmail").value;
      document.getElementById("bookingSequence").value =
        submitRequest.responseText.split(" ").reverse()[0];
      document.getElementById("newStudent").classList.toggle("hidden");
    }
  };

  submitRequest.send(data);
}

function handleStudentSubmission(form) {
  let data = new FormData(form);

  let submitRequest = new XMLHttpRequest();
  submitRequest.open("POST", "/api/students");

  submitRequest.onloadend = () => {
    if (submitRequest.response.status % 100 === 4) {
      alert(submitRequest.responseText);
    }

    if (submitRequest.status === 201) {
      alert(submitRequest.responseText);
      document.getElementById("bookingFormEmail").value =
        document.getElementById("bookingFormEmail").value;
      handleBookingSubmission(document.getElementById("bookingForm"));
      document.getElementById("newStudent").classList.toggle("hidden");
    }
  };

  submitRequest.send(data);
}

document.addEventListener("DOMContentLoaded", () => {
  createSchedulesSelection(document.getElementById("schedules"));

  let bookingForm = document.getElementById("bookingForm");
  let studentForm = document.getElementById("studentForm");

  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    handleBookingSubmission(bookingForm);
  });

  studentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    handleStudentSubmission(studentForm);
  });
});

// function createSchedulesOptions(selectElement) {
//   function createOption(schedule, staff) {
//     let option = document.createElement("option");
//     option.setAttribute("value", schedule.id);
//     option.innerText =
//       staff.find((member) => member.id === schedule.id).name +
//       " | " +
//       schedule.date +
//       " | " +
//       schedule.time;
//     return option;
//   }

//   selectElement.innerHTML = ""; // Clear out existing HTML before generating new select menu

//   let openSchedules;
//   let staff;

//   let requestSchedules = new XMLHttpRequest();
//   requestSchedules.open("GET", "/api/schedules");
//   let requestStaff = new XMLHttpRequest();
//   requestStaff.open("GET", "/api/staff_members");

//   requestSchedules.onloadend = () => {
//     requestStaff.send();
//   };

//   requestStaff.onloadend = () => {
//     openSchedules = JSON.parse(requestSchedules.response).filter(
//       (schedule) => !schedule.student_email
//     );
//     staff = JSON.parse(requestStaff.response);

//     openSchedules.forEach((schedule) => {
//       let option = createOption(schedule, staff);
//       selectElement.append(option);
//     });

//     document.getElementById("pleaseWait").classList.toggle("hidden");
//     selectElement.classList.toggle("hidden");
//   };
//   requestSchedules.send();
// }

// function updateForm(form) {
//   form.reset();
//   let selectElement = document.getElementById("schedules");
//   selectElement.classList.toggle("hidden");
//   document.getElementById("pleaseWait").classList.toggle("hidden");
//   createSchedulesOptions(selectElement);
// }

// function handleNewBooking(bookingForm) {
//   let data = new FormData(bookingForm);
//   let submitRequest = new XMLHttpRequest();

//   submitRequest.open("POST", "/api/bookings");

//   submitRequest.onloadend = () => {
//     if (submitRequest.status === 204) {
//       alert("Booked");
//       updateForm(bookingForm);
//     }

//     if (
//       (submitRequest.status === 404) &
//       submitRequest.responseText.startsWith("Student")
//     ) {
//       alert(submitRequest.responseText);
//       document.getElementById("studentFormEmail").value =
//         document.getElementById("bookingFormEmail").value;
//       document.getElementById("bookingSequence").value =
//         submitRequest.responseText.split(" ").reverse()[0];
//       document.getElementById("newStudent").classList.toggle("hidden");
//     }
//   };

//   submitRequest.send(data);
// }

// function handleNewStudent(studentForm) {
//   let data = new FormData(studentForm);
//   let submitRequest = new XMLHttpRequest();
//   submitRequest.open("POST", "/api/students");

//   submitRequest.onloadend = () => {
//     if (submitRequest.response.status % 100 === 4) {
//       alert(submitRequest.responseText);
//     }

//     if (submitRequest.status === 201) {
//       alert(submitRequest.responseText);
//       document.getElementById("bookingFormEmail").value =
//         document.getElementById("bookingFormEmail").value;
//       handleBookingSubmission(document.getElementById("bookingForm"));
//       document.getElementById("newStudent").classList.toggle("hidden");
//     }
//   };

//   submitRequest.send(data);
// }

// document.addEventListener("DOMContentLoaded", () => {
//   let schedulesSelect = document.getElementById("schedules");
//   createSchedulesOptions(schedulesSelect);

//   let bookingForm = document.querySelector("#bookingForm");
//   let studentForm = document.querySelector("#studentForm");

//   bookingForm.addEventListener("submit", (event) => {
//     event.preventDefault();
//     handleNewBooking(bookingForm);
//   });

//   studentForm.addEventListener("submit", (event) => {
//     event.preventDefault();
//     handleNewStudent(studentForm);
//   });
// });
