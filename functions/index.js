const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');
admin.initializeApp();
const db = getFirestore();
const cors = require('cors')({origin: true});
const client = require('firebase-tools');

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
            follower: id,
            read: false
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

        if(image.userId === id) return;

        const notification = {
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            content: 'liked your photo.',
            displayName: user.displayName,
            profilePhotoURL: user.photoURL,
            follower: id,
            imageURL: image.photoURL,
            userId: image.userId,
            imageId,
            read: false
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
            read: false
        };
        return admin.firestore().collection(`users/${image.userId}/notifications`).add(notification);
    });

exports.markNotificationRead = functions.https.onRequest((request, response) => {
    return cors(request, response, async () => {
        const userId = request.body.userId;
        const unreadNotificationIds = request.body.unreadNotificationIds;
        
        let batch = db.batch();
        unreadNotificationIds.forEach(notificationId => {
            const notification = db.doc(`users/${userId}/notifications/${notificationId}`);
            batch.update(notification, { read: true });
        });
        await batch.commit();
    })
});

exports.deleteImage = functions.firestore.document('images/{imageId}')
    .onDelete(async (snap, context) => {
        const imageId = context.params.imageId;
        const userId = snap.data().userId;
        
        let batch = db.batch();
        const notificationRef = db.collection(`users/${userId}/notifications`);
        const snapshot = await notificationRef.where('imageId', '==', imageId).get();

        snapshot.forEach(notification => {
            const notif = db.doc(`users/${userId}/notifications/${notification.id}`);
            batch.delete(notif);    
        });
        await batch.commit();

        await client.firestore.delete(`images/${imageId}/comments`, {
            project: process.env.GCLOUD_PROJECT,
            recursive: true,
            yes: true,
            force: true,
        }); 

        await client.firestore.delete(`images/${imageId}/likes`, {
            project: process.env.GCLOUD_PROJECT,
            recursive: true,
            yes: true,
            force: true,
        }); 
    });