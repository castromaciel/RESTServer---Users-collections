const { validationResult } = require('express-validator')

const validateFields = ( req, res, next) => {
  const errors = validationResult(req)

  if( !errors.isEmpty() ){
    
    return res.status(400).json({
      headers: {
        errorCode: "400",
        errorMsg: "At this time it is not possible to continue with your request. Please try again later.",
        timestamp: new Date()
      },
      errors: errors.errors
    })
  }

  next();
}

module.exports = {
  validateFields
}