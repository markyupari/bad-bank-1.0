/* ---------------------MONGODB INIT START----------------- */
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://yupari87157:OmksrBHo4DmIyfhw@cluster0.hgetl3b.mongodb.net/?retryWrites=true&w=majority";
let db = null;

// connect to mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
    console.log("Connected successfully to db server");

    // connect to myproject database
    db = client.db('myproject');
});
/* ---------------------MONGODB INIT END------------------- */


/* -------------------FIREBASE INIT START------------------ */
// Firebase config data
const firebaseConfig = {
    apiKey: "AIzaSyAwbABZDwJJuYQcpNUrZryFxqgqrsV8ryU",
    authDomain: "badbank-mern-ad70a.firebaseapp.com",
    projectId: "badbank-mern-ad70a",
    storageBucket: "badbank-mern-ad70a.appspot.com",
    messagingSenderId: "677900496011",
    appId: "1:677900496011:web:75cf9c7d106a5b02a4388e"
};

const {initializeApp} = require('firebase/app');
const {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} = require('firebase/auth');

// initialize firebase
initializeApp(firebaseConfig);

const auth = getAuth();
/* -------------------FIREBASE INIT END-------------------- */


// create user account
function create(name, email, password){
    // createUserWithEmailAndPassword(auth, email, password)
    //     .catch(function (error){
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         if (errorCode == 'auth/weak-password') {
    //             console.log('Weak password');
    //         } else {
    //             console.log('Error message:', errorMessage);
    //         }
    //         console.log('Signup error:', errorCode);
    //         return {"error": errorCode};
    //     });
    
    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
            console.log("User created in firebase");
            var collection = db.collection('users');
            var doc = {name, email, password, balance: 0};
            collection.insertOne(doc, {w:1}, function(err, result){
                err ? reject(err) : resolve(doc);
                /*ROADMAP: On error-> delete user created in Firebase*/
            });
        })
        .catch(function (error){
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                console.log('Weak password');
            } else {
                console.log('Error message:', errorMessage);
            }
            console.log('Signup error:', errorCode);
            resolve({"error": errorCode});
        });
        // var collection = db.collection('users');
        // var doc = {name, email, password, balance: 0};
        // collection.insertOne(doc, {w:1}, function(err, result){
        //     err ? reject(err) : resolve(doc);
        //});
    })
}

// find user account
function find(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({email: email})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}

// login with email and password to firebase
function login(email, password){
    return new Promise((resolve, reject) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            resolve(user);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            reject(error);
          });
    })

}

// find user account
function findOne(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .findOne({email: email})
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));    
    })
}

// update - deposit/withdraw amount
function update(email, amount){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')            
            .findOneAndUpdate(
                {email: email},
                { $inc: { balance: amount}},
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );            


    });    
}

// all users
function all(){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });
    })
}


module.exports = {create, findOne, find, update, all, login};