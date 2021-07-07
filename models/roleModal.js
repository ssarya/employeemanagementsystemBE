const mongoose = require('mongoose');
const roleSchema = mongoose.Schema({
    roleDescription: String,
    roleId: Number,
    roleType:String,
    departmentId:Number,
    departmentDescription:String

});
//,resume:Buffer
module.exports = mongoose.model('Roles', roleSchema);