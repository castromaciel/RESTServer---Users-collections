const { response, request } = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

const getUsers = (req = request, res = response) => {

  const {q, name = 'Noname' , apikey, page = 1, limit = 10} = req.query
  
  res.json({
    description: "get API - controller",
    q,
    name,
    apikey,
    page,
    limit
  });

}

const postUsers = async(req, res = response) => {

  const { name, email, password, role} = req.body;
  const user = new User({
    name,
    email,
    password,
    role
  });
  //Hash de una sola vía, no van a poder regresarlo.
  //NO CONFIAR EN LA PERSONA DE FRONTEND

  //Verificar si el correo existe
  const existEmail = await User.findOne({ email })
  if( existEmail ){
    return res.status(400).json({
      headers:{
        errorCode: "400",
        errorMsg: "The entered email already exists."
      }
    })
  }


  //Encriptar 
  //Salt es el numero de vueltas es el numero de vueltas que se quieren hacer para hacer más complicado el metodo de encriptacion. por defecto es 10.
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync( password, salt)

  //Guardar en db
  await user.save()

  res.status(200).json({
    headers:{
      errorCode: "200",
      errorMsg: "User created successfully"
    },
    data:{
      user,
    }
  })
}

const putUsers = (req, res = response) => {
  
  const id = req.params.id

  res.json({
    description: "put API - controller",
    id
  });
}

const patchUsers = (req, res = response) => {
  
  res.json({
    description: "patch API - controller"
  });
}

const deleteUsers = (req, res = response) => {
  
  res.json({
    description: "delete API - controller"
  });
}

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  patchUsers,
  deleteUsers,
}