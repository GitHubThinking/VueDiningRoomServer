var express = require('express');
var ordersController = require('../controller/orders.js')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/save',ordersController.save)
router.post('/findorders',ordersController.findorders)
// router.post('/login',usersController.login)
// router.get('/logout',usersController.logout)
// router.post('/register',usersController.register)
// router.get('/getuser',usersController.getuser)
// router.post('/recharge',usersController.recharge)
// router.post('/consume',usersController.consume)
module.exports = router;
