

const router = require('express').Router()
const authenticate = require('../auth/authentication')
const { userRegister, userLogin, privateRoute } = require('../controller/userController')

router.route('/register').post(userRegister)
router.route('/login').post(userLogin).get(authenticate,privateRoute)


module.exports = router