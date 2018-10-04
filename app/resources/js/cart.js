let cartPage = {};

cartPage.loadCart = function() {
  const cart = JSON.parse(sessionStorage.getItem('cart'));
  const cartTable = document.getElementById('cartTable');

  // clear table
  cartTable.innerHTML = '';

  const total = app.getCartTotal();

  const headerRow = `<tr>
      <th>ID</th>
      <th>Name</th>
      <th>Price</th>
      <th></th>
    </tr>`;

  cartTable.insertAdjacentHTML('beforeend',headerRow);

  cart.forEach((item, index) => {
    item = JSON.parse(item);

    const row = `<tr>
      <td>${item.id}</td>
      <td>${item.name}</td>
      <td>\$${item.price}</td>
      <td><button class="removeItem" data-index=${index}>Remove</button></td>
    </tr>`;

    cartTable.insertAdjacentHTML('beforeend',row);
  });

  const checkoutBtn = total > 0 ? '<button id="btn_checkout">Check Out</button>' : '';

  const totalRow = `<tr>
      <td></td>
      <td style="content-align: right;">Total: </td>
      <td>\$${total.toFixed(2)}</td>
      <td>${checkoutBtn}</td>
    </tr>`;
  
  cartTable.insertAdjacentHTML('beforeend',totalRow);

  bindRemoveCartButton();
  document.querySelector('#btn_checkout').addEventListener('click', function(e) {
    window.location = '/cart/checkout';
  });
};

function bindRemoveCartButton() {
  cartPage.removeCartButton = document.getElementsByClassName('removeItem');

  Array.from(cartPage.removeCartButton).forEach(function(element) {
    element.addEventListener('click', function(e) {
      const cart = JSON.parse(sessionStorage.getItem('cart'));
      const index = e.target.dataset.index;

      // remove item from the index
      cart.splice(index, 1);

      //update cart
      sessionStorage.setItem('cart', JSON.stringify(cart));

      // re-render cart
      cartPage.loadCart();
    });
  });
};

window.onload = function() {
  app.init();
  cartPage.loadCart();
};