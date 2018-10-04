/*
 * Router
 *
 */

// Dependencies
const navigatorHandlers = require('../modules/navigator/handler');
const executorHandlers = require('../modules/executor/handler');
const Response = require('../model/Response');

const router = {
  '' : navigatorHandlers.index,

  'resources' : navigatorHandlers.resources,

  'account/create' : navigatorHandlers.getSignupPage,

  'session/create' : navigatorHandlers.getLoginPage,

  'account' : navigatorHandlers.getProfilePage,

  'cart' : navigatorHandlers.viewCart,

  'menu' : navigatorHandlers.menu,

  'thankyou' : navigatorHandlers.thankyou,

  'cart/checkout' : navigatorHandlers.checkout,

  'account/createAccount' : executorHandlers.createAccount,

  'account/signin' : executorHandlers.performLogin,

  'account/signout' : executorHandlers.performLogout,

  'account/profile' : executorHandlers.fetchProfile,

  'account/editProfile' : executorHandlers.editProfile,

  'getMenu' : executorHandlers.getMenu,

  'cart/add' : executorHandlers.addItemToCart,

  'cart/update' : executorHandlers.updateCart,

  'cart/doCheckout' : executorHandlers.checkout,

  // 404
  'notFound' : async (data) => { return new Response(404) },
  // Ping
  'ping' : async (data) => { return new Response(200) },
};


// Export module
module.exports = router;
