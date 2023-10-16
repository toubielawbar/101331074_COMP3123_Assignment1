const express = require('express');
const userRoutes = express.Router();
const userModel = require('../models/user')
const bcrypt = require('bcrypt');

userRoutes.route('/')
.get((req, res) => {
    res.send('USERS')
})
.post((req, res) => {
    
})

userRoutes.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                "status": false,
                "message": "Fields cannot be empty"
            });
        }


     

        const newUser = new userModel({
            username,
            email,
            password
        });

        await newUser.save();
        res.status(201).json({
            "status": true,
            "message": "Account created"
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while adding the user.");
    }
});




userRoutes.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ "status": false, "message": "Fields cannot be empty" });
        }

        // Find the user by username
        const existingUser = await userModel.findOne({ username });

        if (!existingUser) {
            return res.status(404).json({ "status": false, "message": "Invalid username or password" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ "status": false, "message": "An error occurred while processing the login" });
    }
});



module.exports = userRoutes;