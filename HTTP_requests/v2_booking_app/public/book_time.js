const Booking = {
  bindEvents() {
    this.bookingForm.addEventListener("submit", this.submitBooking.bind(this));
    this.newStudentForm.addEventListener(
      "submit",
      this.submitNewStudent.bind(this)
    );
  },

  init() {
    this.url = "http://localhost:3000";
    this.schedules = document.querySelector("#schedules_dropdown");
    this.email = document.querySelector("#email");
    this.bookingForm = document.querySelector("#booking_form");
    this.newStudentForm = document.querySelector("#new_student");
    this.newStudentEmail =
      this.newStudentForm.querySelector(".new_student_email");
    this.bookingSequence =
      this.newStudentForm.querySelector(".booking_sequence");
    this.newStudentName =
      this.newStudentForm.querySelector(".new_student_name");
    this.staffMembers = null;
    this.availableSchedules = null;

    this.loadStaffMembers();
    this.bindEvents();
  },

  loadStaffMembers() {
    let request = new XMLHttpRequest();
    request.open("GET", this.url + "/api/staff_members");
    request.responseType = "json";

    request.addEventListener("load", (event) => {
      this.staffMembers = request.response;
      this.loadSchedules();
    });
    request.send();
  },

  loadSchedules() {
    let request = new XMLHttpRequest();
    request.open("GET", this.url + "/api/schedules");
    request.responseType = "json";

    request.addEventListener("load", (event) => {
      this.availableSchedules = request.response;
      this.formatDropDown();
    });
    request.send();
  },

  formatDropDown() {
    this.availableSchedules.forEach((schedule) => {
      if (schedule.student_email === null) {
        let node = document.createElement("option");
        node.textContent =
          this.staffMembers[schedule.staff_id].name +
          " | " +
          schedule.date +
          " | " +
          schedule.time;
        node.setAttribute("value", schedule.id);
        this.schedules.append(node);
      }
    });
  },

  getNewStudentJson() {
    let json = {};
    json.email = this.email.value
      ? this.email.value
      : this.newStudentEmail.value;
    json.name = this.newStudentName.value;
    json.booking_sequence = this.bookingSequence.value;

    return JSON.stringify(json);
  },

  getBookingJson() {
    let json = {};
    let scheduleId = this.schedules.selectedOptions[0].value;
    json.id = scheduleId;
    json.student_email = this.email.value;

    return JSON.stringify(json);
  },

  reloadAvailableSchedules() {
    let selected = this.schedules.selectedOptions[0];
    this.schedules.removeChild(selected);
  },

  addNewStudent(response, json) {
    let inputEmail = JSON.parse(json).student_email;
    let bookingSequence = response.match(/[0-9]+/g);
    this.newStudentEmail.value = inputEmail;
    this.bookingSequence.value = bookingSequence;
    this.newStudentForm.style.visibility = "visible";
  },

  submitNewStudent(event) {
    event.preventDefault();
    let request = new XMLHttpRequest();
    let json = this.getNewStudentJson();
    request.open("POST", this.url + "/api/students");
    request.setRequestHeader("Content-Type", "application/json; charset=utf-8");

    request.addEventListener("load", (event) => {
      event.preventDefault();
      alert(request.response);

      if (request.status === 201) {
        this.newStudentForm.reset();
        this.newStudentForm.style.visibility = "hidden";
        this.submitBooking();
      }
    });
    request.send(json);
  },

  submitBooking(event) {
    if (event) event.preventDefault();
    let request = new XMLHttpRequest();
    let json = this.getBookingJson();
    request.open("POST", this.url + "/api/bookings");
    request.setRequestHeader("Content-Type", "application/json; charset=utf-8");

    request.addEventListener("load", (event) => {
      if (request.status === 204) {
        alert("You are booked!");
        this.reloadAvailableSchedules();
        this.bookingForm.reset();
      } else if (request.status === 404) {
        alert(request.response);
        this.addNewStudent(request.response, json);
      }
    });

    request.send(json);
  },
};

document.addEventListener("DOMContentLoaded", () => {
  Booking.init();
});
