let checkoutPage = {};

checkoutPage.load = function() {
  document.querySelector('#total').innerHTML = app.getCartTotal();

  document.querySelector('#btn_process').addEventListener('click', function(e) {
    // update card in backend to get ready for processing
    checkoutPage.updateCart();
  });;

};

checkoutPage.updateCart = function() {
  const header = {
    'Accept' : 'application/json',
    'Authorization' : 'Bearer ' + app.config.sessionToken.tokenId
  };

  const path = '/cart/update';
  const method = 'PUT';

  const queryStringObject = undefined;

  let cart = JSON.parse(sessionStorage.getItem('cart'));
  let cartData = [];

  cart.forEach( item => {
    cartData.push(JSON.parse(item));
  });

  const payload = {
    email : app.getTokenEmail(),
    cartData
  };

  app.client.request(header, path, method, queryStringObject, payload, checkoutPage.processOrder); 
};

checkoutPage.processOrder = function(statusCode, data) {
  
  if (statusCode == 200) {
    const header = {
      'Accept' : 'application/json',
      'Authorization' : 'Bearer ' + app.config.sessionToken.tokenId
    };

    const path = '/cart/doCheckout';
    const method = 'POST';

    const queryStringObject = undefined;

    const payload = {
      email : app.getTokenEmail()
    };

    app.client.request(header, path, method, queryStringObject, payload, function(statusCode, data) {
      if (statusCode == 200) {
        // clear shopping cart in session storage
        sessionStorage.removeItem('cart');

        // go to thank you page
        window.location = '/thankyou';  
      }
    });
  }

   
};

window.onload = function () {
  app.init();
  checkoutPage.load();
};