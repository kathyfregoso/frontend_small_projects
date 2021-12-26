function formDataToJson(formData) {
  let json = {};
  for (let pair of formData.entries()) {
    json[pair[0]] = pair[1];
  }
  return json;
}

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const formData = JSON.stringify(formDataToJson(data));
  const request = new XMLHttpRequest();

  request.open("POST", form.action);
  request.setRequestHeader("Content-Type", "application/json");
  request.send(formData);

  request.addEventListener("load", (event) => {
    if (request.status === 201) {
      const data = JSON.parse(request.response);
      alert(`Successfully created staff with id: ${data.id}`);
      form.reset();
    } else if (request.status === 400) {
      alert(request.responseText);
    }
  });
});
