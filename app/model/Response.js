/*
 * Wrapper model for response object
 *
 */
 class Response {

  /*
   * statusCode : number
   * payload : object
   */
  constructor(statusCode, payload, contentType) {
    this.statusCode = statusCode;
    this.payload = payload || '';
    this.contentType = contentType || 'text/html';
  }

  payloadToString () {
    if (this.contentType == 'application/json') {
      return JSON.stringify(this.payload);
    }
    return this.payload;
  }
 }

// Export the module
 module.exports = Response;