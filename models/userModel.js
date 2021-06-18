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

    emailId: {
        type: String,
        required: true
    },
    password: String,
    division: String,
    divisionId: Number,
    userId: Number,
    role: String,
    roleType:String,
    firstName: String,
    lastName: String,
    phnNum: String,
    address: String,
    dob: String,
    doj: String

});
//,resume:Buffer
module.exports = mongoose.model('Users', userSchema);