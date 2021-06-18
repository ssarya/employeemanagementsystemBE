const express = require('express');
const bcrypt = require('bcrypt');
const user = require('../models/userModel');
const router = express.Router();

router.post('/Access/Login', async(req, res) => {
    // try{
    const emailId = req.body.emailId;
    const password = req.body.password;
    console.log("emailId = " + emailId + ", password = " + password);
    const User = await user.findOne({ emailId });
    console.log("user = ", User);
    if (!User) {
        res.status(404).json({ error:"Record not found." });
    } else {
        const compare = await bcrypt.compare(password, User.password);
        //const compare = (password === User.password? true : false);
        console.log("compare", compare)
        if (compare) {
            res.status(200).json({ results:User });

        } else {
            res.status(400).json({ error: "Invalid Password" });
        }
    }
})

router.post('/Access/GetCurrentUser', async(req, res) => {
    // try{
    const emailId = req.body.emailId;
    const password = req.body.password;
    const User = await user.findOne({ emailId });
    console.log("user = ", User);
    if (!User) {
        res.status(404).json({ error:"Record not found." });
    } else {
        const compare = await bcrypt.compare(password, User.password);
        //const compare = (password === User.password? true : false);
        console.log("compare", compare)
        if (compare) {
            res.status(200).json({ results:User });

        } else {
            res.status(400).json({ error: "Invalid Password" });
        }
    }
})

module.exports = router;
