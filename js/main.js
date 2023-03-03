const productsArr = [
  {
    product_id: 1,
    product_name: "Nike Sneakers",
    product_price: "112.55$",
    product_image: "./me2.jpg",
    added_to_cart: false,
  },
  {
    product_id: 2,
    product_name: "Nike Sneakers",
    product_price: "112.55$",
    product_image: "./me2.jpg",
    added_to_cart: false,
  },
  {
    product_id: 3,
    product_name: "Nike Sneakers",
    product_price: "112.55$",
    product_image: "./me2.jpg",
    added_to_cart: false,
  },
  {
    product_id: 4,
    product_name: "Nike Sneakers",
    product_price: "112.55$",
    product_image: "./me2.jpg",
    added_to_cart: false,
  },
];
let cartArr = [];

// Add & Remove Functions
function addToCart(productId) {
  editArrayStatus(productId, productsArr, "add");
  addRemoveElementToArray(productId, productsArr, cartArr, "add");
  // Insert Remove From Cart Button Instead of Add To Cart Button
  insertHTML(
    `.prooduct_buttons-addRemove-${productId}`,
    `<button class="prooduct_buttons-addRemove-add" onclick="removeFromCart(${productId})">Remove</button>`
  );
  // Update Cart Container
  createCartProducts(cartArr, "#cart_dropDown");
}
function removeFromCart(productId) {
  editArrayStatus(productId, productsArr, "remove");
  addRemoveElementToArray(productId, productsArr, cartArr, "remove");
  // Insert Add To Cart Button Instead of Remove From Cart Button
  insertHTML(
    `.prooduct_buttons-addRemove-${productId}`,
    `<button class="prooduct_buttons-addRemove-add" onclick="addToCart(${productId})">Add</button>`
  );
  // Update Cart Container
  createCartProducts(cartArr, "#cart_dropDown");
}

// Insert Functions
function insertHTML(target, element) {
  document.querySelector(target).innerHTML = element;
}

// Creational Functions
function createMainProducts(productsArr, target) {
  let container = "";
  productsArr.forEach((product) => {
    container += `
        <div class="product">
            <img class="product_image" src="${product.product_image}" alt="" />
            <p class="product_name">${product.product_name}</p>
            <p class="product_price">${product.product_price}</p>
            <div class="prooduct_buttons">
                <div class="prooduct_buttons-addRemove-${product.product_id}">
                    <button class="prooduct_buttons-addRemove-add" onclick="addToCart(${product.product_id})">Add</button>
                </div>
                <button class="prooduct_buttons-openModal" onclick="openCloseModal(${product.product_id},'open')">open</button>
            </div>
         </div>
    `;
  });
  document.querySelector(target).innerHTML = container;
}
function createCartProducts(cartArr, target) {
  let container = ``;
  document.querySelector("#cart_icon-quantity").textContent = cartArr.length;
  cartArr.forEach((product) => {
    container += `
          <div class="product">
              <img class="product_image" src="${product.product_image}" alt="" />
              <p class="product_name">${product.product_name}</p>
              <p class="product_price">${product.product_price}</p>
           </div>
      `;
  });
  document.querySelector(target).innerHTML = container;
}

function openCloseModal(productId, cases = "close") {
  if (cases === "open") {
    let container;
    for (let i = 0; i < productsArr.length; i++) {
      if (productsArr[i].product_id === productId) {
        container = `
                  <img class="modal_content-img" src="${productsArr[i].product_image}" alt="" />
                  <p class="modal_content-name">${productsArr[i].product_name}</p>
                  <p class="modal_content-price">${productsArr[i].product_price}</p>
                `;
        break;
      }
    }
    document.querySelector("#modal_content").innerHTML = container;
    document.querySelector("#modal").style.height = "400px";
  } else {
    document.querySelector("#modal").style.height = "0px";
  }
}

function editArrayStatus(productId, arr, cases) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].product_id === productId) {
      if ((cases = "add")) {
        // Edit The Array
        arr[i].added_to_cart = true;
      } else {
        // Edit The Array
        arr[i].added_to_cart = false;
      }
      break;
    }
  }
}

function addRemoveElementToArray(productId, productArr, cartArr, cases) {
  for (let i = 0; i < productArr.length; i++) {
    if (productArr[i].product_id === productId) {
      if (cases === "add") {
        // Push Product To Cart Array
        cartArr.push(productsArr[i]);
      } else {
        // Remove Product From Array
        cartArr.splice(i, 1);
      }
      break;
    }
  }
}

createMainProducts(productsArr, ".products-container");
