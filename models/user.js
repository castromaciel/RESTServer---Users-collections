
const { Schema, model } = require('mongoose')

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, 'You must send a name']
  },
  email: {
    type: String,
    required: [true, 'You must send an email'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'You must set a password']
  },
  image:{
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: ['ADMIN_ROLE', 'USER_ROLE']
  },
  status: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  },
})

module.exports = model('User', UserSchema)