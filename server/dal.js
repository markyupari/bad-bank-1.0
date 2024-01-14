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
const {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged} = require('firebase/auth');

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
                err ? reject(err) : resolve(result);
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

// create user account from Google to MongoDB
function createGoogleMongo(name, email, password){
    return new Promise((resolve, reject)=>{
        const collection = db.collection('users'); //use collection 'users'
        const doc = {name, email, password, balance: 0};
        collection.insertOne(doc, {w:1} , function(err,result){
            err ? reject(err) : resolve(result);
        });
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
            resolve(userCredential);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            reject(error);
          });
    })
}

// login with Google (NOT USED)
function googlelogin() {
    return new Promise((resolve, reject) => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                resolve(user);
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                reject(error);
            });
    })
}

// logout
function logout(){
    return new Promise((resolve, reject) => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                resolve();
            })
            .catch((error) => {
                // An error happened.
                console.log(error);
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

// current user (NOT USED)
function currentUser(){
    return new Promise((resolve, reject) => {    
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const data = {email: user.email};
            resolve(data);
          } else {
            // User is signed out
            resolve({email: ""});
          }
        });
    })
}

module.exports = {create, findOne, find, update, all, login, googlelogin, logout, currentUser, createGoogleMongo};