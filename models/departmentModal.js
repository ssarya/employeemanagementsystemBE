const mongoose = require('mongoose');
const deptSchema = mongoose.Schema({
    departmentDescription: String,
    departmentId: Number

});
//,resume:Buffer
module.exports = mongoose.model('Departments', deptSchema);