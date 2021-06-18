const bcrypt = require('bcrypt');
// Import contact model
var users = require('../models/userModel');
// Handle index actions
exports.update= (async(req, res) => {
    // try{
       
    const emailId = req.params.emailId;
    const userDetails = {
        firstName: req.body.firstName,
        lastName: req.body.lastName
    };
    console.log("emailId = ", emailId);
    //console.log("password = ", req.body.password);
    //const User = users.findOne({ emailId });
    var User = await user.findOne({ emailId });
    if (!User) {
        res.status(404).send({
            "error": "Record not found."
        })
    } else {
        console.log("user ...", User)
        user.updateOne({ emailId },{$set:userDetails},
        function(err, update) {
            console.log("update ..." + JSON.stringify(update))
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
    
})
// Handle create contact actions
exports.new = function (req, res) {
    var contact = new Contact();
    contact.name = req.body.name ? req.body.name : contact.name;
    contact.gender = req.body.gender;
    contact.email = req.body.email;
    contact.phone = req.body.phone;
// save the contact and check for errors
    contact.save(function (err) {
        // if (err)
        //     res.json(err);
res.json({
            message: 'New contact created!',
            data: contact
        });
    });
};
// Handle view contact info
exports.view = function (req, res) {
    Contact.findById(req.params.contact_id, function (err, contact) {
        if (err)
            res.send(err);
        res.json({
            message: 'Contact details loading..',
            data: contact
        });
    });
};
// Handle update contact info
exports.update = function (req, res) {
Contact.findById(req.params.contact_id, function (err, contact) {
        if (err)
            res.send(err);
contact.name = req.body.name ? req.body.name : contact.name;
        contact.gender = req.body.gender;
        contact.email = req.body.email;
        contact.phone = req.body.phone;
// save the contact and check for errors
        contact.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Contact Info updated',
                data: contact
            });
        });
    });
};
// Handle delete contact
exports.delete = function (req, res) {
    Contact.remove({
        _id: req.params.contact_id
    }, function (err, contact) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'Contact deleted'
        });
    });
};