const jsonDB = require('node-json-db');

class Manager {
  constructor() {
    this.users = new jsonDB("users", true, true);
    this.guilds = new jsonDB("guilds", true, true);
  }

  saveNewUser(payload) {
    
  }
}

module.exports = Manager;
