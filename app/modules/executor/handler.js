/*
 * Handle page navigator
 *
 */


// Dependencies
const Response = require('../../model/Response');
const fs = require('fs');
const util = require('util');
const fsRead = util.promisify(fs.readFile);
const config = require('../../lib/config');
const helpers = require('../../lib/helpers');

const executorHandlers = {};

executorHandlers.getMenu = async (data) => {
  let requestData = {
    'endpoint' : 'menu',
    'method' : data.method.toUpperCase(),
    'token' : data.headers.token,
    'queryStringObject' : data.queryStringObject,
    'payload' : data.payload
  };

  return new Response(200, await helpers.requestAPI(requestData), 'application/json');
};

executorHandlers.createAccount = async (data) => {
  let requestData = {
    'endpoint' : 'users',
    'method' : data.method.toUpperCase(),
    'queryStringObject' : data.queryStringObject,
    'payload' : data.payload
  };

  return new Response(200, await helpers.requestAPI(requestData), 'application/json');
};

executorHandlers.performLogin = async (data) => {
  let requestData = {
    'endpoint' : 'token',
    'method' : data.method.toUpperCase(),
    'queryStringObject' : data.queryStringObject,
    'payload' : data.payload
  };

  return new Response(200, await helpers.requestAPI(requestData), 'application/json');
};

executorHandlers.performLogout = async (data) => {
  let requestData = {
    'endpoint' : 'token',
    'method' : 'DELETE',
    'queryStringObject' : data.queryStringObject,
    'payload' : data.payload
  };

  return new Response(200, await helpers.requestAPI(requestData), 'application/json');
};
executorHandlers.fetchProfile = async (data) => {
  let requestData = {
    'endpoint' : 'users',
    'method' : 'GET',
    'token' : data.headers.token,
    'queryStringObject' : data.queryStringObject,
    'payload' : data.payload
  };

  return new Response(200, await helpers.requestAPI(requestData), 'application/json');
};
executorHandlers.editProfile = async (data) => {
  let requestData = {
    'endpoint' : 'users',
    'method' : 'PUT',
    'token' : data.headers.token,
    'queryStringObject' : data.queryStringObject,
    'payload' : data.payload
  };

  return new Response(200, await helpers.requestAPI(requestData), 'application/json');
};
executorHandlers.deleteProfile = async (data) => {
  let requestData = {
    'endpoint' : 'users',
    'method' : 'DELETE',
    'token' : data.headers.token,
    'queryStringObject' : data.queryStringObject,
    'payload' : data.payload
  };

  return new Response(200, await helpers.requestAPI(requestData), 'application/json');
};

executorHandlers.getCart = async (data) => {
  let requestData = {
    'endpoint' : 'cart',
    'method' : 'GET',
    'queryStringObject' : data.queryStringObject,
    'payload' : data.payload
  };

  return new Response(200, await helpers.requestAPI(requestData), 'application/json');
};

executorHandlers.updateCart = async (data) => {
  let requestData = {
    'endpoint' : 'cart',
    'method' : 'PUT',
    'token' : data.headers.token,
    'queryStringObject' : data.queryStringObject,
    'payload' : data.payload
  };

  return new Response(200, await helpers.requestAPI(requestData), 'application/json');
};

executorHandlers.checkout = async (data) => {
  let requestData = {
    'endpoint' : 'orders',
    'method' : 'POST',
    'token' : data.headers.token,
    'queryStringObject' : data.queryStringObject,
    'payload' : data.payload
  };

  return new Response(200, await helpers.requestAPI(requestData), 'application/json');
};

// Export module
module.exports = executorHandlers;