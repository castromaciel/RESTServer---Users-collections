const mongoose = require('mongoose');

const dbConnection = async() => {
  
  try {

    await mongoose.connect(process.env.MONGODB_CNN);
    console.log('Succesfull connection at DB')

  } catch (error) {
    throw new Error('Unexpected trying to connect Database')  ;
  }
} 

module.exports = {
  dbConnection
}