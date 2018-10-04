let menuPage = {};

menuPage.loadMenu = function() {
  const header = {
    'Accept' : 'application/json',
    'Authorization' : 'Bearer ' + app.config.sessionToken.tokenId
  };

  const path = '/getMenu';
  const method = 'GET';

  const queryStringObject = {
    email : app.getTokenEmail()
  };

  const payload = undefined;

  app.client.request(header, path, method, queryStringObject, payload, menuPage.renderMenu); 
};

menuPage.renderMenu = function(statusCode, result) {
  const menuTable = document.getElementById('menuTable').getElementsByTagName('tbody')[0];
  menuItems = result.responseBody;

  menuItems.forEach( item => {
    const row = `<tr>
      <td>${item.id}</td>
      <td>${item.name}</td>
      <td>\$  ${item.price}</td>
      <td><button class="addCart" data-item='{"id" : "${item.id}", "name" : "${item.name}", "price" : ${item.price}}'>Add to Cart</button></td>
    </tr>`;

    menuTable.insertAdjacentHTML('beforeend',row);

  });

  bindAddCartButtons();
};

function bindAddCartButtons() {
  menuPage.addCartButton = document.getElementsByClassName('addCart');

  Array.from(menuPage.addCartButton).forEach(function(element) {
    element.addEventListener('click', function(e) {
      const item = e.target.dataset.item;

      let cart = sessionStorage.getItem('cart') != null ? JSON.parse(sessionStorage.getItem('cart')) : [];

      cart.push(item);

      sessionStorage.setItem('cart', JSON.stringify(cart));
      window.alert('Item added to cart');
    });
  });


};

window.onload = function() {
  app.init();
  menuPage.loadMenu();
}