export class Product {
  constructor(id, name, price, img, cartStatus) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.img = img;
    this.cartStatus = cartStatus;
  }
  htmlElement() {
    return `
        <div class="product">
            <img class="product_image" src="${this.img}" alt="" />
            <span class="product_image-circle"></span>
            <p class="product_name">${this.name}</p>
            <p class="product_price">${this.price}</p>
            <div class="product_buttons">
                <button class="product_buttons-add product_buttons-add-${this.id}">Add</button>
                <button class="product_buttons-remove product_buttons-remove-${this.id}">Remove</button>
                <button class="product_buttons-openModal product_buttons-openModal-${this.id}">View</button>
            </div>
        </div>
    `;
  }
}
