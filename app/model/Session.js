/*
 * Wrapper model for session object
 *
 */
 class Session {

  /*
   * statusCode : number
   * payload : object
   */
  constructor({ token, email }) {
    this.token = token;
    this.email = email;
    this.expiration = Date.now() + (1000 * 60); // 1 hour
  }

  toString () {
    return JSON.stringify(this);
  }
 }

// Export the module
 module.exports = Session;