/* eslint-disable */
import * as functions from "firebase-functions";
import * as express from "express";
import * as admin from "firebase-admin";

const app = express();
const key = "../src/key.json";

// Initialize Firebase Admin SDK
const serviceAccount = require(key); // Update with the path to your service account key file
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-rest-3c397-default-rtdb.firebaseio.com", // Replace with your database URL
  // Add any additional Firebase configurations here
});

// Firestore instance
const db = admin.firestore();

// GET request to fetch all entities
app.get("/mevmandatarys", async (req: any, res: any) => {
  try {
    const snapshot = await db.collection("MEVMandatarys").get();
    const entities: any[] = [];
    snapshot.forEach((doc) => entities.push({ id: doc.id, ...doc.data() }));
    res.json(entities);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST request to create a new entity
app.post("/mevmandatarys", async (req: any, res: any) => {
  try {
    const newEntity = req.body;
    const docRef = await db.collection("MEVMandatarys").add(newEntity);
    const doc = await docRef.get();
    res.status(201).json({ id: doc.id, ...doc.data() });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Set up the Express app as a Firebase Cloud Function
export const api = functions.https.onRequest(app);
