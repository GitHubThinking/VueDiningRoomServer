var express = require('express');
var usersController = require('../controller/users.js')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/login',usersController.login)
router.get('/logout',usersController.logout)
router.post('/register',usersController.register)
module.exports = router;
