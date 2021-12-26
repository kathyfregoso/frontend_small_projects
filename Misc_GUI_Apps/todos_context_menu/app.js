const todo_items = [
  { id: 1, title: "Homework" },
  { id: 2, title: "Shopping" },
  { id: 3, title: "Calling Mom" },
  { id: 4, title: "Coffee with John " },
];

function toggleModal(modalBackground, modalDialog) {
  modalBackground.classList.toggle("hide");
  modalDialog.classList.toggle("hide");
}

window.addEventListener("DOMContentLoaded", () => {
  let todo;
  let contextMenu = document.querySelector("#context-menu");

  let template = document.getElementById("todolist").innerHTML;

  let templateScript = Handlebars.compile(template);
  let html = templateScript({ todos: todo_items });

  document.getElementById("todos").insertAdjacentHTML("beforeend", html);

  document.addEventListener("click", (event) => {
    let modalBackground = document.querySelector(".modal-background");
    let modalDialog = document.querySelector(".dialog-box");
    if (event.target.classList.contains("remove")) {
      todo = event.target.parentElement;
      toggleModal(modalBackground, modalDialog);
    }
    if (event.target.id === "yesButton") {
      todo.remove();
      toggleModal(modalBackground, modalDialog);
    }
    if (event.target.id === "noButton") {
      toggleModal(modalBackground, modalDialog);
    }
  });

  document.body
    .querySelector(".todos-container")
    .addEventListener("contextmenu", (event) => {
      event.stopPropagation();
      event.preventDefault();

      contextMenu.style.display = "inline-block";
      contextMenu.style.left = `${event.clientX}px`;
      contextMenu.style.top = `${event.clientY}px`;

      contextMenu.classList.add("visible");
    });

  document.body
    .querySelector(".todos-container")
    .addEventListener("click", (event) => {
      if (event.target !== contextMenu) {
        contextMenu.style.display = "none";
      }
    });
});
