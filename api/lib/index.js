"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = exports.createEntityHandler = exports.getEntitiesHandler = void 0;
/* eslint-disable */
const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");
const express_validator_1 = require("express-validator");
const uuid_1 = require("uuid");
const app = express();
const key = "../src/key.json";
/**
 * Generates a unique ID using UUID.
 * @returns {string} - Generated UUID (Universally Unique Identifier).
 */
const generateUniqueID = () => {
    return (0, uuid_1.v4)(); // Generate a UUID (Universally Unique Identifier)
};
// Initialize Firebase Admin SDK
const serviceAccount = require(key); // Update with the path to your service account key file
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fir-rest-3c397-default-rtdb.firebaseio.com", // Replace with your database URL
    // Add any additional Firebase configurations here
});
// Firestore instance
const db = admin.firestore();
/**
 * Handler for fetching all entities.
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
const getEntitiesHandler = async (req, res) => {
    try {
        const snapshot = await db.collection("MEVMandatarys").get();
        const entities = [];
        snapshot.forEach((doc) => entities.push(Object.assign({ id: doc.id }, doc.data())));
        res.json(entities);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getEntitiesHandler = getEntitiesHandler;
/**
 * Handler for creating a new entity.
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
const createEntityHandler = async (req, res) => {
    try {
        const newEntity = req.body;
        // Generate unique ID if not provided
        if (!newEntity.MEVMandataryID) {
            newEntity.MEVMandataryID = generateUniqueID(); // Implement your unique ID generation logic
        }
        // Check if the generated ID already exists, generate until unique
        let isUnique = false;
        while (!isUnique) {
            const doc = await db
                .collection("MEVMandatarys")
                .doc(newEntity.MEVMandataryID)
                .get();
            if (!doc.exists) {
                isUnique = true;
            }
            else {
                newEntity.MEVMandataryID = generateUniqueID();
            }
        }
        await db.collection("MEVMandatarys").doc(newEntity.MEVMandataryID).set(newEntity);
        res.status(201).json(Object.assign({ id: newEntity.MEVMandataryID }, newEntity));
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.createEntityHandler = createEntityHandler;
// Validation middleware
const validatePostRequest = [
    (0, express_validator_1.body)("MEVMandataryID").optional().isString(),
    (0, express_validator_1.body)("BusinessName").optional().isString(),
    (0, express_validator_1.body)("Street1").optional().isString(),
    (0, express_validator_1.body)("Street2").optional().isString(),
    (0, express_validator_1.body)("City").optional().isString(),
    (0, express_validator_1.body)("Province").optional().isString(),
    (0, express_validator_1.body)("PostalCode").optional().isString(),
    (0, express_validator_1.body)("Phone").optional().isString(),
    (0, express_validator_1.body)("CloverMerchantID").optional().isString(),
    (0, express_validator_1.body)("AuthorizationCode").optional().isString(),
    (0, express_validator_1.body)("BillingFileNo").optional().isString(),
    (0, express_validator_1.body)("IdentificationNo").optional().isString(),
    (0, express_validator_1.body)("TpsNo").optional().isString(),
    (0, express_validator_1.body)("TvqNo").optional().isString(),
    (0, express_validator_1.body)("ActivitySubSector").optional().isString(),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        return next();
    },
];
// Define API endpoints
/**
 * GET request handler for fetching all MEVMandatary entities.
 * @name GET/mevmandatarys
 * @function
 * @memberof api
 * @inner
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
app.get("/mevmandatarys", exports.getEntitiesHandler);
/**
 * POST request handler for creating a new MEVMandatary entity.
 * @name POST/mevmandatarys
 * @function
 * @memberof api
 * @inner
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {express.NextFunction} next - Express next middleware function.
 */
app.post("/mevmandatarys", validatePostRequest, exports.createEntityHandler);
// Set up the Express app as a Firebase Cloud Function
/**
 * Express app instance exported as a Firebase Cloud Function.
 * @name api
 * @type {functions.HttpsFunction}
 */
exports.api = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map