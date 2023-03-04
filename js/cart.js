export class Cart {
  constructor() {
    this.cartValues = [];
  }
  htmlElement(element) {
    return `
        <div>
            <img class="product_image" src="${element.image}" alt="" />
            <p class="product_name">${element.name}</p>
            <p class="product_price">${element.price}</p>
        </div>
    `;
  }
  insertHTMLElements(domTarget) {
    let container = "";
    this.cartValues.forEach((element) => {
      container += this.htmlElement(element);
    });
    document.querySelector(domTarget).innerHTML = container;
  }
  addToCart(element) {
    this.cartValues.push(element);
  }
  removeFromCart(element) {
    for (let i = 0; i < this.cartValues.length; i++) {
      if (this.cartValues[i].id === element.id) {
        this.cartValues.splice(i, 1);
      }
      break;
    }
  }
}
