var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) { res.sendFile(path.join(__dirname, '../public', 'index.html')); });


module.exports = router;
