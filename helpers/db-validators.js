const Role = require('../models/role');

const isValidRole =  async (role = '') => {
  
  const existRole = await Role.findOne( { role });
  if( !existRole ){
    throw new Error(`The Role ${role} doesn't exist!`)
  }

}

module.exports = {
  isValidRole
}