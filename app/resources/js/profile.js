let profilePage = {};

profilePage.loadProfile = function() {
  const header = {
    'Accept' : 'application/json',
    'Authorization' : 'Bearer ' + app.config.sessionToken.tokenId
  };

  const path = '/account/profile';
  const method = 'GET';

  const queryStringObject = {
    email : app.getTokenEmail()
  };

  const payload = undefined;

  app.client.request(header, path, method, queryStringObject, payload, function(statusCode, data) {
    document.getElementById('displayEmail').value = data.responseBody.email;
    document.getElementById('firstName').value = data.responseBody.firstName
    document.getElementById('lastName').value = data.responseBody.lastName
    document.getElementById('address').value = data.responseBody.address
  }); 
};

profilePage.editProfile = function(firstName, lastName, address) {
  const header = {
    'Accept' : 'application/json',
    'Authorization' : 'Bearer ' + app.config.sessionToken.tokenId
  };

  const path = '/account/editProfile';
  const method = 'PUT';

  const queryStringObject = undefined;

  const payload = {
    email : app.getTokenEmail(),
    firstName,
    lastName,
    address
  };

  app.client.request(header, path, method, queryStringObject, payload, function(statusCode, data) {
    if (statusCode == 200) {
      document.querySelector("#profileSuccess").style.display = 'block';
    } else {
      document.querySelector("#profileError").style.display = 'block';
    }
  });
};

profilePage.changePassword = function(password) {
  const header = {
    'Accept' : 'application/json',
    'Authorization' : 'Bearer ' + app.config.sessionToken.tokenId
  };

  const path = '/account/editProfile';
  const method = 'PUT';

  const queryStringObject = undefined;

  const payload = { 
    email : app.getTokenEmail(),
    password 
  };

  app.client.request(header, path, method, queryStringObject, payload, function(statusCode, data) {
    if (statusCode == 200) {
      document.querySelector("#passwordSuccess").style.display = 'block';
    }
  });
};

profilePage.bindButtons = function() {
  const editProfileButton = document.getElementById('btn_editProfile');
  const changePasswordButton = document.getElementById('btn_changePassword');

  editProfileButton.addEventListener('click', function(e) {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const address = document.getElementById('address').value;
    profilePage.editProfile(firstName, lastName, address);
  });

  changePasswordButton.addEventListener('click', function(e) {
    const password = document.getElementById('password').value;
    profilePage.changePassword(password);
  });

};

window.onload = function() {
  app.init();
  profilePage.bindButtons();
  profilePage.loadProfile();
}