document.addEventListener("DOMContentLoaded", () => {
  let images = document.querySelectorAll("img");
  let timer;

  images.forEach((img) => {
    img.addEventListener("mouseover", (event) => {
      let caption = event.target.nextElementSibling;
      timer = setTimeout(() => (caption.style.visibility = "visible"), 2000);
    });

    img.addEventListener("mouseout", (event) => {
      let caption = event.target.nextElementSibling;
      clearTimeout(timer);
      caption.style.visibility = "hidden";
    });
  });
});
