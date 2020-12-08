var express = require('express');
var router = express.Router();

/* API Homepage */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
