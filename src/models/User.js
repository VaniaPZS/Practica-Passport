const { get } = require('express/lib/response');
const {getJSON, saveJSON} = require('../utils/fileHelpers');

class User {
  constructor() {
    this.saveData = saveJSON;
    this.fetchData = getJSON;
  }

  async find(id) {
    const users = getJSON();
    const prom = new Promise((resolve, reject) =>{
      const userFinder = users.find(user => user.id === id);

      if(userFinder != undefined){
        resolve(userFinder);
      }else{
        reject(new Error(`User with id ${id} not found`));
      }
    });
    return prom;
  }

  async create(user) {
    const users = getJSON();

    users.push(user);
    saveJSON(users);

    return user;
  }
};

module.exports = new User();