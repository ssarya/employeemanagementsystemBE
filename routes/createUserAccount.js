const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");

const user = require('../models/userModel');

router.post('/createUserAccount', async(req, res) => {
    
    const emailId = req.body.emailId;
    //const emailId = req.body.emailId;
    //const password = req.body.password;
    const userDetails = {
        emailId: req.body.emailId,
        password: req.body.password
    };
    const User = new user(userDetails);

    if (!(req.body.emailId && req.body.password)) {
        return res
            .status(400)
            .send({ error: "EmailId and password required." });
    }
    if (await user.findOne({ emailId})) {
        return res
            .status(400)
            .send({ "error": `User with emailId: ${User.emailId} already exist.` })
    } else {
        const salt = bcrypt.genSaltSync(10);
        User.password = await bcrypt.hash(User.password, salt);
        await User.save();
        res.status(200).send({
            "message": "User account created successfully!"
        });
    }
});

module.exports = router;