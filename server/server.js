const express = require('express');
const app = express();
var cors = require('cors');
var dal = require('./dal.js');
const functions = require('firebase-functions');
const { user } = require('firebase-functions/v1/auth');

/* Swagger for API documentation */
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json')

app.use(cors());
app.use(express.json());

/* Configure middleware Swagger */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// choose PORT for production or development
//const PORT = process.env.PORT || 8080;
const PORT = 3000;

app.listen(PORT, () => console.log('server started on port:' + PORT));

app.use(express.static('dist'));


app.get('/api/account/create/:name/:email/:password', function(req,res){

    // check if account exists
    dal.find(req.params.email)
        .then((users) => {

            // if user exists, return error message
            if(users.length > 0){
                const userExistsError = "User already exists";
                console.log(userExistsError);
                res.send({"error": userExistsError});    
            }
            else{
                // else create user
                dal.create(req.params.name,req.params.email,req.params.password)
                    .then((user) => {
                        console.log(user);
                        res.send(user);            
                    });            
            }
        });
});

app.get('/api/account/createGoogleMongo/:name/:email/:password', function(req,res){

// check if account exists
dal.find(req.params.email)
    .then((users) => {

        // if user exists, return error message
        if(users.length > 0){
            const userExistsError = "User already exists";
            console.log(userExistsError);
            res.send({"error": userExistsError});    
        }
        else{
            // else create user
            dal.createGoogleMongo(req.params.name,req.params.email,req.params.password)
                .then((user) => {
                    console.log(user);
                    res.send(user);            
                });            
        }
    });
});

// login user 
app.get('/api/account/login/:email/:password', function (req, res) {

    dal.login(req.params.email, req.params.password)
        .then((user) => {
            res.send(user);
        })
        .catch((error) => {
            console.log(error);
            res.send({"Error": "Login error"})
        })
});

// Google login (NOT USED)
app.get("/api/account/googlelogin", function(req, res){
    dal.googlelogin()
        .then((user) => {
            res.send(user);
        })
        .catch((error) => {
            console.log(error);
            res.send({"Error": "Google Login error"})
        })
});

// logout user
app.get('/api/account/logout', function (req, res) {

    dal.logout()
        .then(() => {
            res.send({"Logout": "Success"});
        })
        .catch((error) => {
            console.log(error);
            res.send({"Error": "Logout error"})
        })
});

// find user account (NOT USED)
app.get('/account/find/:email', function (req, res) {

    dal.find(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});

// find one user by email - alternative to find (NOT USED)
app.get('/account/findOne/:email', function (req, res) {

    dal.findOne(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});


// update - deposit/withdraw amount
app.get('/account/update/:email/:amount', function (req, res) {

    var amount = Number(req.params.amount);

    dal.update(req.params.email, amount).
        then((response) => {
            console.log(response);
            res.send(response);
    });    
});

// all accounts
app.get('/api/account/all', function (req, res) {

    dal.all().
        then((docs) => {
            console.log(docs);
            res.send(docs);
    });
});

// current user (NOT USED)
app.get('/api/account/currentuser', function (req, res) {
    dal.currentUser().
        then((docs) => {
            console.log(docs);
            res.send(docs);
       })
       .catch((err) => console.log(err))
});

exports.api = functions.https.onRequest(app);
