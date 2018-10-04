/*
 * Frontend Logic for Sign in page
 *
 */

var signupPage = {};

window.onload = function(){
  signupPage.signupBtn = document.getElementById('btn_signup');

  signupPage.signupBtn.onclick = function() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const repassword = document.getElementById('repassword').value;
    const address = document.getElementById('address').value;

    if (password == repassword) {
      const header = {
        'Accept' : 'application/json'
      };

      const path = '/account/createAccount';
      const method = 'POST';
      const queryStringObject = undefined;
      const payload = {
        firstName : firstName,
        lastName : lastName,
        email : email,
        password : password,
        address : address
      };

      app.client.request(header, path, method, queryStringObject, payload, signupPage.catchsignupResult);  
    }
  };

  signupPage.catchsignupResult = function (statusCode, result) {

    console.log(statusCode, result);

    if (statusCode == 200 && result.success) { 
      
      window.location = '/';
    } else {
      // show error
    }
  };
};




