/*
 * App entry point
 *
 */

// Dependencies
const server = require('./lib/server');

let app = {};

app.init = () => {

	// Start the server
  server.run();

};

app.init();

// Export app
module.exports = app;