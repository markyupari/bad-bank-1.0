const express = require('express');
const app = express();
var cors = require('cors');
var dal = require('./dal.js');
const functions = require('firebase-functions');
const { user } = require('firebase-functions/v1/auth');

// choose PORT for production or development
//const PORT = process.env.PORT || 8080;
const PORT = 3000;

app.listen(PORT, () => console.log('server started on port:' + PORT));

app.use(express.static('dist'));
app.use(cors());

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

// login user 
app.get('/account/login/:email/:password', function (req, res) {

    dal.login(req.params.email, req.params.password)
        .then((user) => {
            console.log(user);
        })
        .catch((error) => {
            console.log(error);
        })

    // dal.find(req.params.email).
    //     then((user) => {

    //         // if user exists, check password
    //         if(user.length > 0){
    //             if (user[0].password === req.params.password){
    //                 res.send(user[0]);
    //             }
    //             else{
    //                 res.send('Login failed: wrong password');
    //             }
    //         }
    //         else{
    //             res.send('Login failed: user not found');
    //         }
    // });
    
});

// find user account
app.get('/account/find/:email', function (req, res) {

    dal.find(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});

// find one user by email - alternative to find
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

exports.api = functions.https.onRequest(app);
