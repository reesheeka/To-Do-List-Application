const express = require('express');
const router = express.Router();

router.use('/user', require('./userRoutes.js'));
router.use('/task', require('./taskRoutes.js'));


module.exports = router;