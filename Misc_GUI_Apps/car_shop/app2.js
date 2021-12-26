/* 
IN PROGRESS
COMMENTED OUT CODE IS WIP
Make the changes needed so that selecting a make 
restricts the model choices to the manufacturer's models.
*/

const cars = [
  {
    id: 1,
    make: "Honda",
    image: "images/honda-accord-2005.jpg",
    model: "Accord",
    year: 2005,
    price: 7000,
  },
  {
    id: 2,
    make: "Honda",
    image: "images/honda-accord-2008.jpg",
    model: "Accord",
    year: 2008,
    price: 11000,
  },
  {
    id: 3,
    make: "Toyota",
    image: "images/toyota-camry-2009.jpg",
    model: "Camry",
    year: 2009,
    price: 12500,
  },
  {
    id: 4,
    make: "Toyota",
    image: "images/toyota-corrolla-2016.jpg",
    model: "Corolla",
    year: 2016,
    price: 15000,
  },
  {
    id: 5,
    make: "Suzuki",
    image: "images/suzuki-swift-2014.jpg",
    model: "Swift",
    year: 2014,
    price: 9000,
  },
  {
    id: 6,
    make: "Audi",
    image: "images/audi-a4-2013.jpg",
    model: "A4",
    year: 2013,
    price: 25000,
  },
  {
    id: 7,
    make: "Audi",
    image: "images/audi-a4-2013.jpg",
    model: "A4",
    year: 2013,
    price: 26000,
  },
];

class App {
  constructor(cars) {
    this.carsList = cars;
    this.templates = {};
    this.carContainer = document.querySelector("#carContainer");
    this.selectorContainer = document.querySelector("#selectorContainer");
    this.selectors = { make: [], model: [], year: [], price: [] };
    this.resetButton = document.querySelector("#reset");
  }

  init() {
    this.makeTemplates();
    this.renderCars();
    this.renderSelectors();
    this.addListeners();
  }

  makeTemplates() {
    document
      .querySelectorAll('[type="text/x-handlebars"]')
      .forEach((template) => {
        this.templates[template.id] = Handlebars.compile(template.innerHTML);
      });
  }

  renderCars() {
    this.carsList.forEach((car) => {
      this.carContainer.insertAdjacentHTML(
        "beforeend",
        this.templates.carTemplate(car)
      );
    });
  }

  getUniqueSelectors() {
    Object.keys(this.selectors).forEach((option) => {
      this.carsList.forEach((car) => {
        if (!this.selectors[option].includes(car[option])) {
          this.selectors[option].push(car[option]);
        }
      });
    });
  }

  addListeners() {
    document.querySelector("form").addEventListener("submit", (event) => {
      event.preventDefault();
      this.filterCarsHandler(event);
    });

    document.querySelector("form").addEventListener("input", (event) => {
      event.preventDefault();
      // this.filterSelectorsHandler(event);
    });

    this.resetButton.addEventListener("click", (event) => {
      this.renderCars();
      this.renderSelectors();
    });
  }

  getFilters(form) {
    let filters = {};
    let formData = new FormData(form);

    for (let [option, value] of formData.entries()) {
      filters[option] = value;
    }

    return filters;
  }

  match(car, filters) {
    return Object.keys(filters).every((option) => {
      if (filters[option] === "All") {
        return true;
      } else {
        return String(car[option]) === filters[option];
      }
    });
  }

  // filterSelectorsHandler(event) {
  //   let choice = event.target.id;
  //   let value = event.target.value;

  //   if (choice === "make") {
  //     if (value === "Honda") {
  //       this.selectors["model"] = ["Accord"];
  //     } else if (value === "Toyota") {
  //       this.selectors["model"] = ["Camry", "Corolla"];
  //     } else if (value === "Suzuki") {
  //       this.selectors["model"] = ["Swift"];
  //     } else if (value === "Audi") {
  //       this.selectors["model"] = ["A4"];
  //     }
  //   }

  //   this.selectorContainer.innerHTML = this.templates.selectorsTemplate({
  //     selectors: this.selectors,
  //   });
  // }

  filterCarsHandler(event) {
    let form = event.target;
    let filters = this.getFilters(form);

    this.carsList.forEach((car) => {
      let id = car.id;
      let carElement = document.querySelector(`[data-id="${id}"]`);

      if (!this.match(car, filters)) {
        carElement.style.display = "none";
      } else {
        carElement.style.display = "";
      }
    });
  }

  renderSelectors() {
    this.getUniqueSelectors();
    this.selectorContainer.innerHTML = this.templates.selectorsTemplate({
      selectors: this.selectors,
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let app = new App(cars);
  app.init();
});
