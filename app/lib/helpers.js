/*
 * Helper functions
 *
 */

// Dependencies
const crypto = require('crypto');
const config = require('./config')
const querystring = require('querystring');
const http = require('http');

const helpers = {};

// SHA256 hash function
helpers.hash = async (targetString) => {
  if (typeof(targetString) == 'string' && targetString.length > 0) {
    const hash = crypto.createHmac('sha256', config.environment.hashSecret).update(targetString).digest('hex');
    return hash;
  } else {
    return false;
  }
};

helpers.createRandomString = async (strLength) => {
  // Validate String length param
  strLength = typeof(strLength) == 'number' && strLength > 0 ? strLength : false;

  if (strLength) {
    // Define all possible characters
    const possibleChars = 'abcdefghijklmnopqrstuvwxyz1234567890';

    let str = '';

    // randomly add each character to the final string
    for (let i = 0; i < strLength; i++) {
      str += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
    }

    return str;
  } else {
    return false;
  }
}

// Parse JSONObject from a string
helpers.parseJSONObject = (string) => {
  try {
    return JSON.parse(string);
  } catch (ex) {
    return {};
  }
};

// Validate email address
helpers.validateEmail = (emailString) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(emailString);
};

helpers.convertCentToDollar = (cent) => {
  return cent / 100;
};

helpers.requestAPI = async (data) => {
  return new Promise ( (resolve, reject) => {
    const payload = data.payload;
    // const payloadString = querystring.stringify(payload);
    const payloadString = JSON.stringify(payload);
    let path = data.endpoint;

    if (data.method == 'GET' || data.method == 'DELETE') { 
      let connector = '?';

      for (let key in data.queryStringObject) {
        path += `${connector}${key}=${data.queryStringObject[key]}`;
        connector = '&';
      }
    }

    const requestDetails = {
      'protocol' : 'http:',
      'host' : `${config.environment.apiHost}`,
      'port' : `${config.environment.apiPort}`,
      'path' : `/${path}`,
      'method' : data.method.toUpperCase(),
      'headers' : {
        'Content-Type' : 'application/json',
        'Content-Length' : Buffer.byteLength(payloadString),
        'Authorization' : `Bearer ${data.token}`
      }
    };

    console.log(requestDetails);
    console.log(payloadString);

    const req = http.request(requestDetails, async res => {
      res.setEncoding('utf-8');

      // grab response status
      const status = res.statusCode;

      let responseBodyString = '';
      await res.on('data', chunk => {
        responseBodyString += chunk;
      });

      //resolve with response body if request went through successful, else Error
      if (status == 200 || status == 201) {
        resolve({'success' : true, 'responseBody' : JSON.parse(responseBodyString)});
      } else {
        resolve({'success' : false, 'responseBody' : JSON.parse(responseBodyString)});
      }

      // Bind request to err event
      req.on('error', (err) => {
        reject(err);
      });
      
    });

    req.write(payloadString);

    req.end();
  });

};

 // Export module
 module.exports = helpers;