/*
 * Handle page navigator
 *
 */


// Dependencies
const Response = require('../../model/Response');
const Template = require('../../model/Template');
const fs = require('fs');
const util = require('util');
const fsRead = util.promisify(fs.readFile);
const config = require('../../lib/config');
const helpers = require('../../lib/helpers');

const navigatorHandlers = {};

navigatorHandlers.index = async (data) => {
  if (data.method != 'get') {
    return new Response(405, {'Error' : 'Method not allowed'});
  };

  let responseTemplate = new Template('index');
  try {
    await responseTemplate.load(true);  
  } catch (ex) {
    // return 404 if cannot load template
    return new Response(404);    
  }
  await responseTemplate.interpolate(config.environment.globalTemplateKey);

  return new Response(200, responseTemplate.templateContent);
};

navigatorHandlers.resources = async (data) => {
  if (data.method != 'get') {
    return new Response(405, {'Error' : 'Method not allowed'});
  };

  const resource = await fsRead(data.trimmedPath, 'utf-8');

  if (!resource) {
    return new Response(404);
  }

  let responseObject = new Response(200, resource);

  if (data.trimmedPath.indexOf('.css') > -1) {
    responseObject.contentType = 'text/css';
  } else if (data.trimmedPath.indexOf('.js') > -1) {
    responseObject.contentType = 'text/javascript';
  } else if (data.trimmedPath.indexOf('.json') > -1) {
    responseObject.contentType = 'application/json';
  } else if (data.trimmedPath.indexOf('.jpeg') > -1) {
    responseObject.contentType = 'image/jpeg';
  } else if (data.trimmedPath.indexOf('.png') > -1) {
    responseObject.contentType = 'image/png';
  } else if (data.trimmedPath.indexOf('.ico') > -1) {
    responseObject.contentType = 'image/x-icon';
  } else {
    responseObject.contentType = 'text/html';
  }

  return responseObject;  
};

navigatorHandlers.viewCart = async (data) => {
  if (data.method != 'get') {
    return new Response(405, {'Error' : 'Method not allowed'});
  };

  let responseTemplate = new Template('viewCart');
  try {
    await responseTemplate.load(true);  
  } catch (ex) {
    // return 404 if cannot load template
    return new Response(404);    
  }
  await responseTemplate.interpolate(config.environment.globalTemplateKey);

  return new Response(200, responseTemplate.templateContent);
};

navigatorHandlers.getSignupPage = async (data) => {
  if (data.method != 'get') {
    return new Response(405, {'Error' : 'Method not allowed'});
  };

  let responseTemplate = new Template('signup');
  try {
    await responseTemplate.load(true);  
  } catch (ex) {
    // return 404 if cannot load template
    return new Response(404);    
  }
  await responseTemplate.interpolate(config.environment.globalTemplateKey);

  return new Response(200, responseTemplate.templateContent);
};
navigatorHandlers.getLoginPage = async (data) => {
  if (data.method != 'get') {
    return new Response(405, {'Error' : 'Method not allowed'});
  };

  let responseTemplate = new Template('login');
  try {
    await responseTemplate.load(true);  
  } catch (ex) {
    // return 404 if cannot load template
    return new Response(404);    
  }
  
  await responseTemplate.interpolate(config.environment.globalTemplateKey);

  return new Response(200, responseTemplate.templateContent);
};

navigatorHandlers.menu = async (data) => {
  if (data.method != 'get') {
    return new Response(405, {'Error' : 'Method not allowed'});
  };

  let responseTemplate = new Template('menu');
  try {
    await responseTemplate.load(true);  
  } catch (ex) {
    // return 404 if cannot load template
    return new Response(404);    
  }
  
  await responseTemplate.interpolate(config.environment.globalTemplateKey);

  return new Response(200, responseTemplate.templateContent);
};

navigatorHandlers.getProfilePage = async (data) => {
  if (data.method != 'get') {
    return new Response(405, {'Error' : 'Method not allowed'});
  };

  let responseTemplate = new Template('profile');
  try {
    await responseTemplate.load(true);  
  } catch (ex) {
    // return 404 if cannot load template
    return new Response(404);    
  }
  
  await responseTemplate.interpolate(config.environment.globalTemplateKey);

  return new Response(200, responseTemplate.templateContent);
};

navigatorHandlers.checkout = async (data) => {
  if (data.method != 'get') {
    return new Response(405, {'Error' : 'Method not allowed'});
  };

  let responseTemplate = new Template('checkout');
  try {
    await responseTemplate.load(true);  
  } catch (ex) {
    // return 404 if cannot load template
    return new Response(404);    
  }
  
  await responseTemplate.interpolate(config.environment.globalTemplateKey);

  return new Response(200, responseTemplate.templateContent);
};


navigatorHandlers.thankyou = async (data) => {
  if (data.method != 'get') {
    return new Response(405, {'Error' : 'Method not allowed'});
  };

  let responseTemplate = new Template('thankyou');
  try {
    await responseTemplate.load(false);  
  } catch (ex) {
    // return 404 if cannot load template
    return new Response(404);    
  }
  
  await responseTemplate.interpolate(config.environment.globalTemplateKey);

  return new Response(200, responseTemplate.templateContent);
};
// Export module
module.exports = navigatorHandlers;