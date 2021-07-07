const express = require('express');
const bcrypt = require('bcrypt');
const user = require('../models/userModel');
const router = express.Router();

router.post('/Access/Login', async(req, res) => {
    // try{
    const emailId = req.body.emailId;
    const password = req.body.password;
    console.log("emailId = " + emailId + ", password = " + password);
    const User = await user.findOne({ empSignInID : emailId});
    console.log("user = ", User);
    if (!User) {
        res.status(404).send({ "errorMessage":"Invalid SignIn ID or Password." });
    } else {
        const compare = await bcrypt.compare(password, User.password);
        //const compare = (password === User.password? true : false);
        console.log("compare", compare)
        if (compare) {
            res.status(200).json({ results:User });

        } else {
            res.status(400).send({ "errorMessage": "Invalid SignIn ID or Password." });
        }
    }
})

router.post('/Access/GetProfile', async(req, res) => {
    // try{
    const emailId = req.body.empSignInID;
    const password = req.body.password;
    const User = await user.findOne({ empSignInID : emailId });
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
            res.status(400).send({ "errorMessage": "Profile Details not found." });
        }
    }
})

router.post('/Access/ChangePassword', async(req, res) => {
    
    const emailId = req.body.empSignInID;
    var User = await user.findOne({ empSignInID:emailId });
    if (!User) {
        res.status(404).send({
            "errorMessage": "Record not found."
        })
    } else {
        const compare = await bcrypt.compare(req.body.OldPassword, User.password);
        //const compare = (password === User.password? true : false);
        console.log("compare", compare)
        if (compare) {
            const salt = bcrypt.genSaltSync(10);
            var updatedPassword = await bcrypt.hash(req.body.NewPassword, salt);
            user.updateOne({ empSignInID:emailId },{'password':updatedPassword},
            function(err, results) {
                console.log("results ..." + JSON.stringify(results))
                if (err) {
                    res.status(400).send({
                        "errorMessage": "Bad Request."
                    })
                }else{
                    res.status(200).send({
                        "message": "Password reset successfully!"
                    });
                }
            })
        } else {
            res.status(400).send({ "errorMessage": "Invalid Old Password" });
        }        
    }
});

router.post('/Access/UpdateProfile', async(req, res) => {
    
    const emailId = req.body.empSignInID;
   console.log(emailId); 
    const userDetails = {
        empFirstName : req.body.empFirstName,
        empLastName: req.body.empLastName,
        empDOB:req.body.empDOB,
        empGender:req.body.empGender,
        empEmail:req.body.empEmail,
        empMailingAdd:req.body.empMailingAdd,
        empMailingAdd1:req.body.empMailingAdd1,
        empPhoneNo:req.body.empPhoneNo,
        empEmgConct:req.body.empEmgConct,
        isProfileComplete:req.body.isProfileComplete
    };

    var User = await user.findOne({ empSignInID : emailId });
    if (!User) {
        res.status(404).json({
            "error": "Record not found."
        })
    } else {
        console.log("user ...", User)
        user.updateOne({ empSignInID : emailId },{$set:userDetails},
        function(err, results) {
            console.log("results ..." + JSON.stringify(results))
            if (err) {
                res.status(400).send({
                    "errorMessage": "Bad Request."
                })
            }else{
                res.status(200).send({
                    "message": "User details updated successfully!"
                });
            }
        })
        
    }
    

});

module.exports = router;
