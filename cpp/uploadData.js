const admin = require("firebase-admin");
const fs = require("fs");

// Initialize Firebase Admin SDK
const serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Load dataset from JSON file
const data = JSON.parse(fs.readFileSync("disease_precaution.json", "utf-8"));

// Function to upload data
async function uploadData() {
  const collectionRef = db.collection("DATASET3");

  for (const [key, value] of Object.entries(data)) {
    await collectionRef.doc(key).set(value);
  }
  console.log("Data uploaded successfully!");
}

uploadData().catch(console.error);
