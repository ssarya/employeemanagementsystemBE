const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const user = require('../models/userModel');

router.post('/Admin/CreateUser', async(req, res) => {
    
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

router.post('/Admin/UpdateUser', async(req, res) => {
    
    const emailId = req.body.emailId;
    const userDetails = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role:req.body.role,
        roleType:req.body.roleType
    };

    var User = await user.findOne({ emailId });
    if (!User) {
        res.status(404).send({
            "error": "Record not found."
        })
    } else {
        console.log("user ...", User)
        user.updateOne({ emailId },{$set:userDetails},
        function(err, results) {
            console.log("results ..." + JSON.stringify(results))
            if (err) {
                res.status(400).send({
                    "error": "Bad Request."
                })
            }else{
                res.status(200).send({
                    "message": "User details updated successfully!"
                });
            }
        })
        
    }
    

});

router.delete('/Admin/DeleteUser/:emailId', async(req, res) => {
    
    const emailId = req.params.emailId;
    var User = await user.findOne({ emailId });
    if (!User) {
        res.status(404).send({
            "error": "Record not found."
        })
    } else {
        console.log("user ...", User)
        user.deleteOne({ emailId },
        function(err, results) {
            console.log("results ..." + JSON.stringify(results))
            if (err) {
                res.status(400).send({
                    "error": "Bad Request."
                })
            }else{
                res.status(200).send({
                    "message": "User deleted successfully!"
                });
            }
        })
        
    }
    

});

module.exports = router;