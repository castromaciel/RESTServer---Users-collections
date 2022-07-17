const { response, request } = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

const getUsers = async (req = request, res = response) => {

  // const {q, name = 'Noname' , apikey, page = 1, limit = 10} = req.query
  const query = { status: true }
  const { limit = 5, from = 0 } = req.query;

  //disparar dos  sentencias de manera simultanea

  // const users = await User.find( query )
  //   .skip( Number(from) )
  //   .limit( Number(limit) )

  // const total = await User.countDocuments( query );

  const [total, users] = await Promise.all([
    User.countDocuments( query ),
    User.find( query )
      .skip( Number(from) )
      .limit( Number(limit) )
  ])

  res.status(200).json({
    headers:{
      errorCode: 200,
      errorMsg: "Get users succesfully",
      timestamp: new Date()
    },
    data:{
      total,
      users
    } 
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

  //Encriptar 
  //Salt es el numero de vueltas es el numero de vueltas que se quieren hacer para hacer más complicado el metodo de encriptacion. por defecto es 10.
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync( password, salt )

  //Guardar en db
  await user.save()

  res.status(200).json({
    headers:{
      errorCode: 200,
      errorMsg: "User created successfully",
      timestamp: new Date()
    },
    data:{
      user,
    }
  })
}

const putUsers = async(req, res = response) => {
  
  const { id } = req.params;
  const { _id, password, google, email, ...rest } = req.body;

  //TODO Validar conta db.-
  if( password ){
    const salt = bcrypt.genSaltSync();
    rest.password = bcrypt.hashSync( password, salt )
  }

  // el id, no es un id de mongo. 
  const user = await User.findByIdAndUpdate(id, rest)

  res.status(201).json({
    headers:{
      errorCode: 201,
      errorMsg: "User edited successfully",
      timestamp: new Date()
    },
    data:{
      user,
    }
  });
}

const patchUsers = (req, res = response) => {
  
  res.json({
    description: "patch API - controller"
  });
}

const deleteUsers = async (req, res = response) => {
  
  const { id } = req.params

  // const user = await User.findByIdAndDelete( id )
  const user = await User.findByIdAndUpdate( id, {status: false})

  
  res.status(200).json({
    headers:{
      errorCode: 200,
      errorMsg: "User deleted successfully",
      timestamp: new Date()
    },
    data:{
      description: `User ${user.name} was deleted`,
      user,
    }

  });
}

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  patchUsers,
  deleteUsers,
}