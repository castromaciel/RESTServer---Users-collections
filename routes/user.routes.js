
const { Router } = require('express');
const { check } = require('express-validator');
const {
   getUsers, 
   postUsers, 
   putUsers, 
   patchUsers, 
   deleteUsers 
  } = require('../controllers/user.controller');
const { isValidRole, existEmail, existUserId } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router()

router.get("/", getUsers);

router.post("/", [
  check('name', 'The name is required').not().isEmpty(),
  check('password', 'The password must be more than 6 letters').isLength({min: 6}),
  check('email', 'The email is not valid').isEmail().custom(existEmail),
  // check('role', 'The role is not valid').isIn(['ADMIN_ROLE','USER_ROLE']),
  check('role').custom( isValidRole ),
  validateFields
] ,postUsers);

router.put("/:id", [
  check('id', 'The Id is not valid').isMongoId(),
  check('id').custom( existUserId ),
  check('role').custom( isValidRole ),
  validateFields
],putUsers);

router.patch("/", patchUsers);

router.delete("/:id", [
  check('id', 'The Id is not valid').isMongoId(),
  check('id').custom( existUserId ),
  validateFields
],
deleteUsers);

module.exports = router;