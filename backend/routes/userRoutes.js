// const express = require('express');
// const { registerUser, loginUser } = require('../controllers/userController');
// const router = express.Router();

// router.post('/register', registerUser);
// router.post('/login', loginUser);

// module.exports = router;

import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.js'; // Ensure to include .js for ES modules

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get("/check", (req, res) => {
    res.send("On User Route");
  });
export default router;