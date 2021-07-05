var express = require('express');
var router = express.Router();
const { signup, list, signin, signout, isAuto } = require('../controllers/index')
const { removes } = require('../controllers/index')
const { auto } = require('../middleware/auto')

/* GET users listing. */
router.post('/', signup);
router.get('/', auto, list)
router.delete('/', auto, removes)
router.post('/signin', signin)
router.get('/signout', signout)
router.get('/isAuto', isAuto)

module.exports = router;