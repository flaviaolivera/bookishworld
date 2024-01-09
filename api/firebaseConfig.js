const admin = require('firebase-admin');
const serviceAccount = require('./config/bookishworld-918fd-firebase-adminsdk-pf9q6-08bb61afa6.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = db;
