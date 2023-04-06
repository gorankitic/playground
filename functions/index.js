const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');
admin.initializeApp();
const db = getFirestore();


exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello world!");
});

exports.followNotification = functions.firestore.document('followers/{userId}/userFollowers/{id}')
        .onCreate(async (snap, context) => {
            const userId = context.params.userId;
            const id = context.params.id;

            let user = null;

            await db.doc(`users/${id}`).get().then(doc => {
                user = doc.data();
            })

            const notification = {
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
                content: 'started following you.',
                displayName: user.displayName,
                photoURL: user.photoURL,
                userId,
                follower: id
            }
                
            return admin.firestore().collection(`users/${userId}/notifications`).add(notification);
        });
