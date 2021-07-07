const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const user = require('../models/userModel');
const dept = require('../models/departmentModal');
const role = require('../models/roleModal');

router.get('/Admin/GetUsers', async(req, res) => {
    const User = await user.find();
    console.log("user = ", User);
    if (!User) {
        res.status(404).json({ error:"Record not found." });
    } else {
        res.status(200).json(User);
    }
});

router.get('/Admin/GetEmployees/:departmentId', async(req, res) => {
    const deptId = req.params.departmentId;
    var Users = await user.find({ empRole:deptId });
    console.log("user = ", Users);
    if (!Users) {
        res.status(404).json({ error:"Record not found." });
    } else {
        res.status(200).json(Users);
    }
});

router.get('/Admin/GetEmpProfile/:empSignInID', async(req, res) => {
    const emailId = req.params.empSignInID;
    var User = await user.find({ empSignInID:emailId });
    if (!User) {
        res.status(404).send({
            "error": "Record not found."
        })
    } else {
        res.status(200).json(User);
    }
});

router.get('/Admin/GetRoles', async(req, res) => {
    const Roles = await role.find();
    if (!Roles) {
        res.status(404).json({ error:"Record not found." });
    } else {
        res.status(200).json(Roles);
    }
});

router.get('/Admin/GetRole/:roleId', async(req, res) => {
    const roleID = req.params.roleId;
    var Role = await role.find({ roleId:roleID });
    if (!Role) {
        res.status(404).send({
            "error": "Record not found."
        })
    } else {
        res.status(200).json(Role);
    }
});

router.post('/Admin/AddRole', async(req, res) => {
    const roleName = req.body.RoleDescription;
    const roleID = req.body.roleId;
    const roleDetails = {
        roleDescription : req.body.roleDescription,
        roleId : req.body.roleId,
        roleType:req.body.roleType,
        departmentId:req.body.departmentId,
        departmentDescription:req.body.departmentDescription
    }
    const Role = new role(roleDetails);

    
    if (await role.findOne({ roleDescription : roleName})) {
        return res
            .status(400)
            .send({ "errorMessage": `Role with name: ${Role.roleDescription} already exist.` })
    } else if (await role.findOne({ roleId : roleID})) {
        return res
            .status(400)
            .send({ "errorMessage": `Role with ID: ${Role.roleId} already exist.` })
    }else{
        await Role.save();
        res.status(200).send({
            "message": "Role saved successfully!"
        });
    }
});

router.post('/Admin/UpdateRole', async(req, res) => {
    const roleID = req.body.roleId;
    const roleDetails = {
        roleDescription : req.body.roleDescription,
        roleId : req.body.roleId,
        roleType:req.body.roleType,
        departmentId:req.body.departmentId,
        departmentDescription:req.body.departmentDescription
    }
    const Role = new role(roleDetails);
    if (!Role) {
        res.status(404).json({
            "error": "Record not found."
        })
    } else {
        role.updateOne({ roleId : roleID },{$set:roleDetails},
        function(err, results) {
            if (err) {
                res.status(400).send({
                    "errorMessage": "Bad Request."
                })
            }else{
                res.status(200).send({
                    "message": "Role details updated successfully!"
                });
            }
        })
    }
});

router.delete('/Admin/DeleteRole/:roleId', async(req, res) => {
    
    const roleID = req.params.roleId;
    var Dept = await role.findOne({ roleId:roleID });
    if (!Dept) {
        res.status(404).send({
            "errorMessage": "Record not found."
        })
    } else {
        role.deleteOne({ roleId:roleID  },
        function(err, results) {
            if (err) {
                res.status(400).send({
                    "errorMessage": "Bad Request."
                })
            }else{
                res.status(200).send({
                    "message": "Role deleted successfully!"
                });
            }
        })
    }
});

router.get('/Admin/GetDepartments', async(req, res) => {
    const Dept = await dept.find();
    console.log("user = ", Dept);
    if (!Dept) {
        res.status(404).json({ error:"Record not found." });
    } else {
        res.status(200).json(Dept);
    }
});

router.get('/Admin/GetDepartment/:departmentId', async(req, res) => {
    const deptId = req.params.departmentId;
    var Dept = await dept.find({ departmentId:deptId });
    if (!Dept) {
        res.status(404).send({
            "error": "Record not found."
        })
    } else {
        res.status(200).json(Dept);
    }
});

router.post('/Admin/AddDepartment', async(req, res) => {
    const deptName = req.body.departmentDescription;
    const deptID = req.body.departmentId;
    const deptDetails = {
        departmentDescription : req.body.departmentDescription,
        departmentId : req.body.departmentId
    }
    const Dept = new dept(deptDetails);

    
    if (await dept.findOne({ departmentDescription : deptName})) {
        return res
            .status(400)
            .send({ "errorMessage": `Department with name: ${Dept.departmentDescription} already exist.` })
    } else if (await dept.findOne({ departmentId : deptID})) {
        return res
            .status(400)
            .send({ "errorMessage": `Department with ID: ${Dept.departmentId} already exist.` })
    }else{
        await Dept.save();
        res.status(200).send({
            "message": "Department saved successfully!"
        });
    }
});

router.post('/Admin/UpdateDepartment', async(req, res) => {
    const deptID = req.body.departmentId;
    const deptDetails = {
        departmentDescription : req.body.departmentDescription,
        departmentId : req.body.departmentId
    }
    const Dept = new dept(deptDetails);
    if (!Dept) {
        res.status(404).json({
            "error": "Record not found."
        })
    } else {
        dept.updateOne({ departmentId : deptID },{$set:deptDetails},
        function(err, results) {
            if (err) {
                res.status(400).send({
                    "errorMessage": "Bad Request."
                })
            }else{
                res.status(200).send({
                    "message": "Department details updated successfully!"
                });
            }
        })
        
    }
    

});

router.delete('/Admin/DeleteDepartment/:departmentId', async(req, res) => {
    
    const deptID = req.params.departmentId;
    var Dept = await dept.findOne({ departmentId:deptID });
    if (!Dept) {
        res.status(404).send({
            "errorMessage": "Record not found."
        })
    } else {
        dept.deleteOne({ departmentId:deptID  },
        function(err, results) {
            if (err) {
                res.status(400).send({
                    "errorMessage": "Bad Request."
                })
            }else{
                res.status(200).send({
                    "message": "Department deleted successfully!"
                });
            }
        })
        
    }
});
    

router.post('/Admin/CreateUser', async(req, res) => {
    
    const empSignInID = req.body.empSignInID;
    //const emailId = req.body.emailId;
    //const password = req.body.password;
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
        empDepartment:req.body.empDepartment,
        empDepartmentDesc:req.body.empDepartmentDesc,
        empRole:req.body.empRole,
        empRoleDesc:req.body.empRoleDesc,
        empRoleType:req.body.empRoleType,
        empDOJ:req.body.empDOJ,
        empType:req.body.empType,
        empTypeDesc:req.body.empTypeDesc,
        empID:req.body.empID,
        empPayrollType:req.body.empPayrollType,
        empPayrollTypeDesc:req.body.empPayrollTypeDesc,
        empSalary:req.body.empSalary,
        empSignInID:req.body.empSignInID,
        password:req.body.password,
        isProfileComplete:req.body.isProfileComplete
    };
    const User = new user(userDetails);

    if (!(req.body.empSignInID && req.body.password)) {
        return res
            .status(400)
            .send({ "errorMessage": "EmailId and password required." });
    }
    if (await user.findOne({ empSignInID})) {
        return res
            .status(400)
            .send({ "errorMessage": `User with Sign In Email: ${User.empSignInID} already exist.` })
    } else {
        const salt = bcrypt.genSaltSync(10);
        User.password = await bcrypt.hash(User.password, salt);
        await User.save();
        res.status(200).send({
            "message": "Employee account created successfully!"
        });
    }
});

router.post('/Admin/UpdateUser', async(req, res) => {
    
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
        empDepartment:req.body.empDepartment,
        empDepartmentDesc:req.body.empDepartmentDesc,
        empRole:req.body.empRole,
        empRoleDesc:req.body.empRoleDesc,
        empRoleType:req.body.empRoleType,
        empDOJ:req.body.empDOJ,
        empType:req.body.empType,
        empTypeDesc:req.body.empTypeDesc,
        empPayrollType:req.body.empPayrollType,
        empPayrollTypeDesc:req.body.empPayrollTypeDesc,
        empSalary:req.body.empSalary,
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

router.delete('/Admin/DeleteUser/:empSignInID', async(req, res) => {
    
    const emailId = req.params.empSignInID;
    var User = await user.findOne({ empSignInID:emailId });
    if (!User) {
        res.status(404).send({
            "errorMessage": "Record not found."
        })
    } else {
        console.log("user ...", User)
        user.deleteOne({ empSignInID:emailId },
        function(err, results) {
            console.log("results ..." + JSON.stringify(results))
            if (err) {
                res.status(400).send({
                    "errorMessage": "Bad Request."
                })
            }else{
                res.status(200).send({
                    "message": "User deleted successfully!"
                });
            }
        })
        
    }
    

});

router.post('/Admin/ResetPassword/:empSignInID', async(req, res) => {
    
    const emailId = req.params.empSignInID;
    var User = await user.findOne({ empSignInID:emailId });
    if (!User) {
        res.status(404).send({
            "errorMessage": "Record not found."
        })
    } else {
        console.log("user ...", User)
        const salt = bcrypt.genSaltSync(10);
        var updatedPassword = await bcrypt.hash('EMS@1234', salt);
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
        
    }
    

});

module.exports = router;