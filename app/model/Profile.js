/*
 * Wrapper model for user profile object
 *
 */
 class Profile {

  constructor({ email, firstName, lastName, password, address }) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password || '';
    this.address = address;
  }

  toString () {
    return JSON.stringify(this);
  }
 }

// Export the module
 module.exports = Profile;