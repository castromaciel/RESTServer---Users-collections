const Role = require('../models/role');
const User = require('../models/user');

const isValidRole =  async (role = '') => {
  
  const existRole = await Role.findOne( { role });
  if( !existRole ){
    throw new Error(`The Role ${role} doesn't exist!`)
  }

}

const existEmail = async ( email = '' ) => {

  const existEmail = await User.findOne({ email })
  if( existEmail ){
    throw new Error(`The entered email already exists.`);
  }

}  

const existUserId = async ( id ) => {

  const existUser = await User.findById(id)
  if( !existUser ){
    throw new Error(`The id ${id} doesnt't exists.`);
  }

}  

module.exports = {
  isValidRole,
  existEmail,
  existUserId
}