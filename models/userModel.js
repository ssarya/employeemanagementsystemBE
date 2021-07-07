const mongoose = require('mongoose');

/*mongoose.connect("mongodb://localhost:27017/employeemanagementsystemDB", {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

var db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));

db.once("open", function() {
    console.log("Connection Successful!");
});
*/
const userSchema = mongoose.Schema({
    empFirstName:String,
    empLastName:String,
    empDOB:String,
    empGender:String,
    empEmail:String,
    empMailingAdd:String,
    empMailingAdd1:String,
    empPhoneNo:String,
    empEmgConct:String,
    empDepartment:String,
    empDepartmentDesc:String,
    empRole:String,
    empRoleDesc:String,
    empRoleType:String,
    empDOJ:String,
    empType:String,
    empTypeDesc:String,
    empID:Number,
    empPayrollType:String,
    empPayrollTypeDesc:String,
    empSalary:Number,
    empSignInID:String,
    password:String,
    isProfileComplete:Boolean
});
//,resume:Buffer
module.exports = mongoose.model('Users', userSchema);