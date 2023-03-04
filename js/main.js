import { Product } from "./product.js";
import { Cart } from "./cart.js";
import { products } from "./data.js";

const productsArr = products;

// Cart Container
let cart = new Cart();

// Product Container
let productsContainer = "";
// Create HTML Products
productsArr.forEach((element) => {
  let product = new Product(
    element.id,
    element.name,
    element.price,
    element.image,
    element.cartStatus
  );
  productsContainer += product.htmlElement();
});
// Add HTML Products To DOM
document.querySelector(".products-container").innerHTML = productsContainer;

//////////////////////////////////////////////////////////////////////////////////////////////////
// Add Click Events To Each Product's Buttons
productsArr.forEach((product, i) => {
  let addHtmlElement = document.querySelector(
    `.product_buttons-add-${product.id}`
  );
  let removeHtmlElement = document.querySelector(
    `.product_buttons-remove-${product.id}`
  );
  let modalElement = document.querySelector(
    `.product_buttons-openModal-${product.id}`
  );

  // Check Product's Cart Status
  productsArr[i].cartStatus
    ? (addHtmlElement.style.display = "none")
    : (removeHtmlElement.style.display = "none");

  // Add Click Event For Add To Cart Button
  addHtmlElement.addEventListener("click", () => {
    cart.addToCart(product);
    cart.insertHTMLElements("#cart_dropDown");
    addHtmlElement.style.display = "none";
    removeHtmlElement.style.display = "initial";
  });

  // Add Click Event For Remove From Cart Button
  removeHtmlElement.addEventListener("click", () => {
    cart.removeFromCart(product);
    addHtmlElement.style.display = "initial";
    removeHtmlElement.style.display = "none";
    cart.insertHTMLElements("#cart_dropDown");
  });

  // Add Click Event For Modal Button
  modalElement.addEventListener("click", () => {
    console.log("SS");
    document.querySelector("#modal_content").innerHTML = `
      <p class="modal_content-name">${product.name}</p>
      <p class="modal_content-price">${product.price}</p>
      <img class="modal_content-image" src="${product.image}"/>
  `;
  });
});
//////////////////////////////////////////////////////////////////////////////////////////////////
