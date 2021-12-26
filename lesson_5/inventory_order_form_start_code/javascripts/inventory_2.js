class Inventory {
  constructor() {
    this.lastId = 0;
    this.collection = [];
    this.setDate = function () {
      let date = new Date();
      let orderDate = document.querySelector("#order_date");
      orderDate.textContent = date.toUTCString();
    };
  }

  cacheTemplate() {
    let iTmpl = document.querySelector("#inventory_item");
    this.template = Handlebars.compile(iTmpl.innerHTML);
    iTmpl.remove();
  }

  add() {
    this.lastId += 1;
    let item = {
      id: this.lastId,
      name: "",
      stock_number: "",
      quantity: 1,
    };
    this.collection.push(item);

    return item;
  }

  remove(index) {
    this.collection = this.collection.filter((item) => item.id !== index);
  }

  get(id) {
    let foundItem;

    this.collection.forEach((item) => {
      if (item.id === id) {
        foundItem = item;
        return false;
      }
    });

    return foundItem;
  }

  update(product) {
    let id = this.findID(product);
    let item = this.get(id);

    item.name = product.querySelector("[name^='item_name']").value;
    item.stock_number = product.querySelector(
      "[name^='item_stock_number']"
    ).value;
    item.quantity = product.querySelector("[name^='item_quantity']");
  }

  newItem(event) {
    event.preventDefault();
    let item = this.add();
    document
      .querySelector("#inventory")
      .insertAdjacentHTML("beforeend", this.template({ id: item.id }));
  }

  findParent(event) {
    let targetElement = event.target;
    return targetElement.closest("tr");
  }

  findID(product) {
    let element = product.querySelector("input[type='hidden']");
    return +element.value;
  }

  deleteItem(event) {
    event.preventDefault();
    if (event.target.classList.contains("delete")) {
      let item = this.findParent(event);
      this.remove(this.findID(item));
      item.remove();
    }
  }

  updateItem(event) {
    if (event.target.nodeName === "INPUT") {
      let product = this.findParent(event);
      this.update(product);
    }
  }

  bindEvents() {
    document
      .querySelector("#add_item")
      .addEventListener("click", this.newItem.bind(this));
    document
      .querySelector("#inventory")
      .addEventListener("click", this.deleteItem.bind(this));
    document
      .querySelector("#inventory")
      .addEventListener("focusout", this.updateItem.bind(this));
  }

  init() {
    this.setDate();
    this.cacheTemplate();
    this.bindEvents();
  }
}

document.addEventListener("DOMContentLoaded", (event) => {
  let inventory = new Inventory();
  inventory.init();
});
