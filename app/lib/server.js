/*
 * Server config
 *
 */

// Dependencies
const http = require('http');
const https = require('https');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const fs = require('fs');
const path = require('path');
const helpers = require('./helpers');
const config = require('./config');
const router = require('./router');
const util = require('util');
const debug = util.debuglog('workers');

const server = {};

server.httpServer = http.createServer( (req, res) => {
  server.handleRequest(req, res);
});

// Instantiate HTTPS server
server.httpsServerOptions = {
  'key' : fs.readFileSync(config.httpsKeyPath),
  'cert' : fs.readFileSync(config.httpsCertPath),
};

server.httpsServer = https.createServer(server.httpsServerOptions, (req, res) => {
  server.handleRequest(req, res);
});


// Handle server logic for http and https server
server.handleRequest = (req, res) => {
  // parse url
  const parsedUrl = url.parse(req.url, true);

  // extract path
  const reqPath = parsedUrl.pathname;
  const trimmedPath = reqPath.replace(/^\/+|\/+$/g,'');

  // get query string as an object
  const queryStringObject = parsedUrl.query;

  // get request HTTP Method
  const method = req.method.toLowerCase();

  // get the headers as an object
  const headers = req.headers;

  // extract token from header authorization 
  const authorization = typeof(headers.authorization) !== 'undefined' ? headers.authorization : '';

  if (authorization != '') {
    var bearerToken = authorization.split(' ');

    if (bearerToken[0] === 'Bearer' && bearerToken[1] !== undefined) {
      headers.token = bearerToken[1];
    } else {
      headers.token = null;
    }  
  }

  // get payload
  const decoder = new StringDecoder('utf-8');
  let buffer = '';

  // read payload data
  req.on('data', (data) => {
    buffer += decoder.write(data);
  });

  // 
  req.on('end', () => {
    buffer += decoder.end();

    //choose handler this request should go to, if one is not found use not found handler
    let chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : router.notFound; 

    // check if the request is asking for a resources, otherwise keep the chosenHandler
   chosenHandler = trimmedPath.indexOf('resources/') > -1 ? router.resources : chosenHandler;

    // Construct data object to send to handler
    let data = {
      trimmedPath,
      queryStringObject,
      method,
      headers,
      'payload' : helpers.parseJSONObject(buffer)
    };

    chosenHandler(data).then( response => {
      if (response.statusCode == 200) {
        debug(config.colorCode.Green, data.method.toUpperCase() + ' /' + trimmedPath + ' ' + response.statusCode);
      } else {
        debug(config.colorCode.Red, data.method.toUpperCase() + ' /' + trimmedPath + ' ' + response.statusCode);
      }

      res.setHeader('Content-Type', response.contentType);      
      res.writeHead(response.statusCode);
      res.end(response.payloadToString());
    }).catch( err => {
      console.log('Error occurred: ' + err);
    });

  });
};


server.run = () => {
  //start HTTP server
  server.httpServer.listen(config.environment.httpPort, function() {
    console.log(config.colorCode.Cyan, 'running and listening on port ' + config.environment.httpPort);
  });

  //start HTTPS server
  server.httpsServer.listen(config.environment.httpsPort, function() {
    console.log(config.colorCode.Pink, 'running and listening on port ' + config.environment.httpsPort);
  });
};

module.exports = server;