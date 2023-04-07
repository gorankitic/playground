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
        });
        const notification = {
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            content: 'started following you.',
            displayName: user.displayName,
            profilePhotoURL: user.photoURL,
            userId,
            follower: id
        }  
        return admin.firestore().collection(`users/${userId}/notifications`).add(notification);
    });

exports.likeNotification = functions.firestore.document('images/{imageId}/likes/{id}')
    .onCreate(async (snap, context) => {
        const imageId = context.params.imageId;
        const id = context.params.id;

        let user = null;
        await db.doc(`users/${id}`).get().then(doc => {
            user=doc.data();
        });
        let image = null;
        await db.doc(`images/${imageId}`).get().then(doc => {
            image = doc.data();
        });

        const notification = {
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            content: 'liked your photo.',
            displayName: user.displayName,
            profilePhotoURL: user.photoURL,
            follower: id,
            imageURL: image.photoURL,
            userId: image.userId,
            imageId,

        };
        return admin.firestore().collection(`users/${image.userId}/notifications`).add(notification);
    });

exports.commentNotification = functions.firestore.document('images/{imageId}/comments/{id}')
    .onCreate(async (snap, context) => {
        const imageId = context.params.imageId;
        const id = context.params.id;

        let comment = null;
        await db.doc(`images/${imageId}/comments/${id}`).get().then(doc => {
            comment=doc.data();
        });
        let image = null;
        await db.doc(`images/${imageId}`).get().then(doc => {
            image = doc.data();
        });

        if(image.userId === snap.data().userId) return;

        const notification = {
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            content: 'commented on your photo.',
            displayName: comment.displayName,
            profilePhotoURL: comment.photoURL,
            follower: comment.userId,
            imageURL: image.photoURL,
            userId: image.userId,
            imageId,
        };
        return admin.firestore().collection(`users/${image.userId}/notifications`).add(notification);
    });