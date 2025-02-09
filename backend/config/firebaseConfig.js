<<<<<<< HEAD
const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');

const firebaseConfig = {
  // Replace with your Firebase config object
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = { app, db };
=======
const admin = require("firebase-admin");
const path = require("path");

let serviceAccount;
try {
  serviceAccount = require("D:\\hackathon\\agritech-a01f5-firebase-adminsdk-fbsvc-0a591af4f0.json");
  
  // Validate required fields
  if (!serviceAccount.private_key || !serviceAccount.client_email || !serviceAccount.project_id) {
    throw new Error("Missing required fields in service account file");
  }
} catch (error) {
  console.error("Error loading Firebase service account:", error);
  process.exit(1);
}

// Initialize Firebase
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://agritech-a01f5.firebaseapp.com"
  });
} catch (error) {
  console.error("Error initializing Firebase:", error);
  process.exit(1);
}

const db = admin.firestore();
module.exports = { db };
>>>>>>> f811cefb62554fcbfa4a6eb9b94da4ae1054e758
