/* eslint-disable */
import * as functions from "firebase-functions";
import * as express from "express";
import * as admin from "firebase-admin";
import { body, validationResult } from "express-validator";
import { v4 as uuidv4 } from 'uuid';

const app = express();
const key = "../src/key.json";

/**
 * Generates a unique ID using UUID.
 * @returns {string} - Generated UUID (Universally Unique Identifier).
 */
const generateUniqueID = (): string => {
  return uuidv4(); // Generate a UUID (Universally Unique Identifier)
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
export const getEntitiesHandler = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const snapshot = await db.collection("MEVMandatarys").get();
    const entities: any[] = [];
    snapshot.forEach((doc) => entities.push({ id: doc.id, ...doc.data() }));
    res.json(entities);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Handler for creating a new entity.
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
export const createEntityHandler = async (
  req: express.Request,
  res: express.Response
) => {
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
      } else {
        newEntity.MEVMandataryID = generateUniqueID();
      }
    }

    await db.collection("MEVMandatarys").doc(newEntity.MEVMandataryID).set(newEntity);
    res.status(201).json({ id: newEntity.MEVMandataryID, ...newEntity });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Validation middleware
const validatePostRequest = [
  body("MEVMandataryID").optional().isString(),
  body("BusinessName").optional().isString(),
  body("Street1").optional().isString(),
  body("Street2").optional().isString(),
  body("City").optional().isString(),
  body("Province").optional().isString(),
  body("PostalCode").optional().isString(),
  body("Phone").optional().isString(),
  body("CloverMerchantID").optional().isString(),
  body("AuthorizationCode").optional().isString(),
  body("BillingFileNo").optional().isString(),
  body("IdentificationNo").optional().isString(),
  body("TpsNo").optional().isString(),
  body("TvqNo").optional().isString(),
  body("ActivitySubSector").optional().isString(),
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const errors = validationResult(req);
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
app.get("/mevmandatarys", getEntitiesHandler);

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
app.post("/mevmandatarys", validatePostRequest, createEntityHandler);

// Set up the Express app as a Firebase Cloud Function
/**
 * Express app instance exported as a Firebase Cloud Function.
 * @name api
 * @type {functions.HttpsFunction}
 */
export const api = functions.https.onRequest(app);
