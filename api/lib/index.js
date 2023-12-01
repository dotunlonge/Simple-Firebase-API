"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
/* eslint-disable */
const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");
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
app.get("/mevmandatarys", async (req, res) => {
    try {
        const snapshot = await db.collection("MEVMandatarys").get();
        const entities = [];
        snapshot.forEach((doc) => entities.push(Object.assign({ id: doc.id }, doc.data())));
        res.json(entities);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// POST request to create a new entity
app.post("/mevmandatarys", async (req, res) => {
    try {
        const newEntity = req.body;
        const docRef = await db.collection("MEVMandatarys").add(newEntity);
        const doc = await docRef.get();
        res.status(201).json(Object.assign({ id: doc.id }, doc.data()));
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Set up the Express app as a Firebase Cloud Function
exports.api = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map