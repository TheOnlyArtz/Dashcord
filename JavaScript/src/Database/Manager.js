const jsonDB = require('node-json-db');
const database = new jsonDB("users", true, true);

class Manager {
  constructor() {

  }

  saveNewUser(payload) {
    console.log('payload');
  }
}

module.exports = Manager;
