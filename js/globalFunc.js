// Creational Functions
let createMainProducts = (productsArr, target) => {
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
};
let createCartProducts = (cartArr, target) => {
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
};

export { createMainProducts, createCartProducts };
