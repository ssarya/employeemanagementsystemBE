// Import express
let express = require('express');
var dotenv = require('dotenv');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Initialise the app
let app = express();

dotenv.config();  //populate all the configuration variable in application

// Import routes
var access = require('./routes/access');
var admin = require('./routes/admin');
var createUserAccount = require('./routes/createUserAccount');
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
console.log(process.env.MONGODB_URI);
//var mongoDB = "mongodb://localhost:27017/employeemanagementsystemDB";
var mongoDB = "mongodb+srv://test:Test1234@emscluster.eldvs.mongodb.net/employeemanagementsystemDB?retryWrites=true&w=majority";
//var mongoDB = process.env.MONGODB_URI;
// Connect to Mongoose and set connection variable
//mongoose.connect(mongoDB, { useNewUrlParser: true});
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log("Error connecting Database")
else
    console.log("Db connected successfully")

// Setup server port
var port = process.env.PORT || 8082;
var allowCrossDomain = function(req, res, next) {
     res.header("Access-Control-Allow-Origin", "*");
     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");
 
     // intercept OPTIONS method
     if ('OPTIONS' == req.method) {
          res.sendStatus(200)
     } else {
         next();
     }
 };
 app.use(allowCrossDomain);

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));
app.use("/api", access);
app.use("/api", admin);
app.use('/api',createUserAccount);
// Use Api routes in the App
//app.use('/api', apiRoutes);
// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});