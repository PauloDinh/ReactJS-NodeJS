const express = require('express');
const router = express.Router();

const { asyncHandler } = require('../auth/checkAuth');

const userController = require('../controllers/user.controller');

router.post('/register', asyncHandler(userController.register));

module.exports = router;
