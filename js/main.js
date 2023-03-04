import { Product } from "./product.js";
import { Cart } from "./cart.js";
import { data } from "./data.js";

let productsArr;
// Cart Container
let cart = new Cart();
// Product Container
let productsContainer = "";

// Set Prodduct Array To Locale Storage
if (localStorage.getItem("productArray")) {
  productsArr = JSON.parse(localStorage.getItem("productArray"));
} else {
  productsArr = data;
  localStorage.setItem("productArray", JSON.stringify(data));
}

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

  // Add To Cart Click Event
  addHtmlElement.addEventListener("click", () => {
    cart.addToCart(product);
    cart.insertHTMLElements("#cart_modal-content-items");
    addHtmlElement.style.display = "none";
    removeHtmlElement.style.display = "initial";
    document.querySelector("#header_cart-icon-quantity").textContent =
      cart.cartValues.length;
  });

  // Remove From Cart Click Event
  removeHtmlElement.addEventListener("click", () => {
    cart.removeFromCart(product);
    addHtmlElement.style.display = "initial";
    removeHtmlElement.style.display = "none";
    cart.insertHTMLElements("#cart_modal-content-items");
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
let cartModal = document.querySelector("#cart_modal");
let cartIcon = document.querySelector("#header_cart-icon");
let cartOverlay = document.querySelector("#cart_modal-overlay");
let cartModalCloseBtn = document.querySelector("#cart_modal-content-close");
cartIcon.addEventListener("click", () => {
  if (cart.cartValues.length > 0) {
    cartModal.style.display = "block";
  }
});
cartOverlay.addEventListener("click", () => {
  cartModal.style.display = "none";
});
cartModalCloseBtn.addEventListener("click", () => {
  cartModal.style.display = "none";
});
//////////////////////////////////////////////////////////////////////////////////////////////////
// Product Modal Click Events
let productModalOverlay = document.querySelector("#modal_overlay");
let productModal = document.querySelector("#modal");

productModalOverlay.addEventListener("click", () => {
  productModal.style.display = "none";
  document.querySelector(".home").style.zIndex = "1";
});
