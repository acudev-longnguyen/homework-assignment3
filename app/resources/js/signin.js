/*
 * Frontend Logic for Sign in page
 *
 */

var signinPage = {};

window.onload = function(){
  signinPage.signinBtn = document.getElementById('btn_signin');

  signinPage.signinBtn.onclick = function() {
    // hide existing error
    document.querySelector('.formError').style.display = 'none';

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const header = {
      'Accept' : 'application/json'
    };

    const path = '/account/signin';
    const method = 'POST';
    const queryStringObject = undefined;
    const payload = {
      email : email,
      password : password
    };

    app.client.request(header, path, method, queryStringObject, payload, signinPage.catchSignInResult);
  };

  signinPage.catchSignInResult = function (statusCode, result) {
    if (statusCode == 200 && result.success) { 
      const email = result.responseBody.email;
      const tokenId = result.responseBody.tokenId;

      app.setSessionToken(result.responseBody);
      // sessionStorage.setItem('email', email);
      // sessionStorage.setItem('tokenId', tokenId);
      window.location = '/';
    } else {
      // show error
      document.querySelector('.formError').style.display = 'block';
    }
  };
};




