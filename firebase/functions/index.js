const functions = require('firebase-functions');
const admin = require('firebase-admin')

admin.initializeApp();
const firestore = admin.firestore() 

const settings = {
    timestampsInSnapshots: true
}

firestore.settings(settings)

exports.on_create_user = functions.auth.user().onCreate((user, account) => {
    const { uid, email, displayName } = user
    return firestore.doc(`users/${uid}`).set({ uid, email, displayName })
})

//const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
