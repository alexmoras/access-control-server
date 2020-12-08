const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {

});

/* User is not created here. That is managed in the auth endpoint. */

/* UPDATE user */
router.put('/:username', (req, res, next) => {

});

/* DELETE user */
router.delete('/:username', (req, res, next) => {

});

module.exports = router;
