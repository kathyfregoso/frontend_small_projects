let form = document.querySelector("form");

function submitForm() {
  let formData = new FormData(form);
  let json = Object.fromEntries(formData.entries());

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:3000/api/staff_members");
  xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  xhr.timeout = 5000;

  xhr.addEventListener("load", (event) => {
    let data = JSON.parse(xhr.response);
    if (xhr.status === 201) {
      alert(`The staff member was added with this id: ${data.id}`);
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

  xhr.send(JSON.stringify(json));
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  submitForm();
});
