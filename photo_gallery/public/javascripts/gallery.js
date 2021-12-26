class App {
  constructor() {
    this.templates = {}; // holds compiled templates as property values
    this.slidesDiv = document.querySelector("#slides");
    this.slideshow = document.querySelector("#slideshow");
    this.slideFigures = this.slideshow.querySelectorAll("figure");
    this.photos = null;
    this.currentPhotoIndex = null;
    this.currentPhoto = null;
    this.photoInfoSection = document.querySelector("section > header");
    this.commentsSection = document.querySelector("#comments ul");
    this.previousPhotoArrow = document.querySelector("a.prev");
    this.nextPhotoArrow = document.querySelector("a.next");
    this.likeButton = document.querySelector(".like");
    this.favoriteButton = document.querySelector(".favorite");
    this.commentForm = document.querySelector("form");
  }

  async init() {
    this.makeTemplates();
    this.registerAllPartials();
    await this.requestPhotos();
    this.bindEvents();
  }

  prevSlideHandler(event) {
    event.preventDefault();
    this.fadeOut();

    if (this.currentPhotoIndex === 0) {
      this.currentPhotoIndex = this.photos.length - 1;
    } else {
      this.currentPhotoIndex -= 1;
    }

    this.currentPhoto = this.photos[this.currentPhotoIndex];
    this.fadeIn();
    this.renderPhotoInfo();
    this.requestPhotoComments();
  }

  nextSlideHandler(event) {
    event.preventDefault();
    this.fadeOut();

    if (this.currentPhotoIndex === this.photos.length - 1) {
      this.currentPhotoIndex = 0;
    } else {
      this.currentPhotoIndex += 1;
    }

    this.currentPhoto = this.photos[this.currentPhotoIndex];
    this.fadeIn();
    this.renderPhotoInfo();
    this.requestPhotoComments();
  }

  likeOrFavoriteHandler(event) {
    event.preventDefault();
    let button = event.target;

    if (
      button.className.includes("like") ||
      button.className.includes("favorite")
    ) {
      let url = button.getAttribute("href");
      let id = button.dataset.id;
      this.updateLikeOrFavorite(url, id, button);
    }
  }

  newCommentHandler(event) {
    event.preventDefault();
    let form = event.target;
    let url = form.getAttribute("action");
    let commentData = new FormData(form);
    console.log(this.currentPhoto);
    let id = this.slideshow.querySelector(`[data-id="${this.currentPhoto.id}"]`)
      .dataset.id;
    commentData.set("photo_id", id);
    this.submitCommentForm(url, commentData);
    form.reset();
  }

  fadeOut() {
    let currentPhotoElement = this.slideshow.querySelector(
      `[data-id="${this.currentPhoto.id}"]`
    );
    currentPhotoElement.classList.add("hide");
    currentPhotoElement.classList.remove("show");
  }

  fadeIn() {
    let currentPhotoElement = this.slideshow.querySelector(
      `[data-id="${this.currentPhoto.id}"]`
    );
    currentPhotoElement.classList.remove("hide");
    currentPhotoElement.classList.add("show");
  }

  bindEvents() {
    this.previousPhotoArrow.addEventListener("click", (event) =>
      this.prevSlideHandler(event)
    );
    this.nextPhotoArrow.addEventListener("click", (event) =>
      this.nextSlideHandler(event)
    );
    this.photoInfoSection.addEventListener("click", (event) => {
      this.likeOrFavoriteHandler(event);
    });
    this.commentForm.addEventListener("submit", (event) => {
      this.newCommentHandler(event);
    });
  }

  makeTemplates() {
    document
      .querySelectorAll('[type="text/x-handlebars"]')
      .forEach((template) => {
        this.templates[template.id] = Handlebars.compile(template.innerHTML);
      });
  }

  registerAllPartials() {
    document.querySelectorAll("[data-type=partial]").forEach((partial) => {
      Handlebars.registerPartial(partial.id, partial.innerHTML);
    });
  }

  renderPhotos() {
    this.slidesDiv.innerHTML = this.templates.photos({ photos: this.photos });
  }

  renderPhotoInfo() {
    this.photoInfoSection.innerHTML = this.templates.photo_information(
      this.currentPhoto
    );
  }

  // returns: array of photos data in JSON format
  requestPhotos() {
    return fetch("http://localhost:3000/photos")
      .then((response) => response.json())
      .then((json) => {
        this.photos = json;
        this.currentPhotoIndex = 0;
        this.currentPhoto = this.photos[this.currentPhotoIndex];
        this.renderPhotos();
        this.renderPhotoInfo();
        this.requestPhotoComments();
      });
  }
  // returns: array of comments for this.currentPhoto.id
  requestPhotoComments() {
    return fetch(
      `http://localhost:3000/comments?photo_id=${this.currentPhoto.id}`
    )
      .then((response) => response.json())
      .then((json) => {
        this.commentsSection.innerHTML = this.templates.photo_comments({
          comments: json,
        });
      });
  }

  submitCommentForm(url, commentData) {
    return fetch("http://localhost:3000" + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: new URLSearchParams(commentData).toString(),
    })
      .then((response) => response.json())
      .then((json) => {
        this.commentsSection.insertAdjacentHTML(
          "beforeend",
          this.templates.photo_comment(json)
        );
      });
  }

  updateLikeOrFavorite(url, id, button) {
    return fetch("http://localhost:3000" + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ photo_id: id }),
    })
      .then((response) => response.json())
      .then((json) => {
        button.textContent = button.textContent.replace(/\d+/, json.total);
      });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let app = new App();
  app.init();
});
