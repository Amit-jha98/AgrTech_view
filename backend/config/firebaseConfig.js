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