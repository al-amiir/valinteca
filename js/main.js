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
document.querySelector(".products_container").innerHTML = productsContainer;

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
    cart.insertHTMLElements("#cart_modal-content");
    addHtmlElement.style.display = "none";
    removeHtmlElement.style.display = "initial";
    document.querySelector("#header_cart-icon-quantity").textContent =
      cart.cartValues.length;
  });

  // Add Click Event For Remove From Cart Button
  removeHtmlElement.addEventListener("click", () => {
    cart.removeFromCart(product);
    addHtmlElement.style.display = "initial";
    removeHtmlElement.style.display = "none";
    cart.insertHTMLElements("#cart_modal-content");
    document.querySelector("#header_cart-icon-quantity").textContent =
      cart.cartValues.length;
  });

  // Add Click Event For Product Modal Button
  modalElement.addEventListener("click", () => {
    document.querySelector("#modal_content").innerHTML = `
      <img id="modal_content-image" src="${product.image}"/>
      <p id="modal_content-name">${product.name}</p>
      <p id="modal_content-price">${product.price}</p>
  `;
    document.querySelector("#modal").style.display = "flex";
    document.querySelector(".home").style.zIndex = 100;
  });
});
//////////////////////////////////////////////////////////////////////////////////////////////////
// Cart Modal Click Events
let cartOverlay = document.querySelector("#cart_modal-overlay");
let cartIcon = document.querySelector("#header_cart-icon");
let cartContent = document.querySelector("#cart_modal-content");
cartOverlay.addEventListener("click", () => {
  cartOverlay.style.display = "none";
  cartContent.style.height = "0px";
});
cartIcon.addEventListener("click", () => {
  if (cart.cartValues.length > 0) {
    cartContent.style.height = "fit-content";
    cartOverlay.style.display = "block";
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////////
// Product Modal
let productModalOverlay = document.querySelector("#modal_overlay");
let productModal = document.querySelector("#modal");

productModalOverlay.addEventListener("click", () => {
  productModal.style.display = "none";
  document.querySelector(".home").style.zIndex = "1";
});
