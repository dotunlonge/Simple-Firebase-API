# Firebase REST API Project

This project implements a RESTful API using Firebase Cloud Functions, Express.js, and Firebase Firestore for managing entities related to "MEVMandatarys."

## Project Overview

This repository contains code for an API that provides endpoints for fetching and creating entities related to "MEVMandatarys." The API is hosted on Firebase Cloud Functions and utilizes Firebase Firestore as the database.

## Features

- **GET Endpoint** - Fetches all entities related to "MEVMandatarys."
- **POST Endpoint** - Creates a new entity related to "MEVMandatarys."

## Setup Instructions

### Prerequisites

- Node.js and npm installed locally
- Firebase CLI installed (`npm install -g firebase-tools`)

### Steps

1. Clone the repository locally:

   ```bash
   git clone https://github.com/dotunlonge/fb-api.git
   cd fb-api
   ```

2. Install dependencies:
    - cd into api folder, and run
   ```bash
   npm install
   ```

3. Configure Firebase:
   
   - Set up a Firebase project on the Firebase Console (https://console.firebase.google.com/).
   - Obtain a service account key file and place it in the `src` directory.
   - Update the `key.json` path in `index.ts` with the correct path to your service account key file.
   - Replace the `databaseURL` in the `admin.initializeApp` function with your Firebase Realtime Database URL.

4. Deploy the Firebase Functions:

   ```bash
   firebase deploy --only functions
   ```

5. Test the Endpoints:
   
   - After deployment, test the API endpoints using the provided URLs for the Firebase Functions.
   - Or test locally with firebase serve, if you have firebase installed globally or cd into the api folder, then run npm run serve

## Project Structure

- `src/index.ts` - Main file containing Firebase Cloud Functions setup and Express.js configurations.
- `src/key.json` - Service account key file for Firebase Admin SDK.

## API Endpoints

### GET /mevmandatarys

- **Description:** Retrieves all entities related to "MEVMandatarys."
- **HTTP Method:** GET
- **Response Format:** JSON
- **Sample Response:** 
  ```json
  [
    {
      "id": "entity_id",
      // Other entity fields
    },
    // Additional entities
  ]
  ```

### POST /mevmandatarys

- **Description:** Creates a new entity related to "MEVMandatarys."
- **HTTP Method:** POST
- **Request Body Format:** JSON
- **Sample Request Body:**
  ```json
  {
        "AuthorizationCode": "",
        "MEVMandataryID": "",
        "Street2": "",
        "Street1": "",
        "CloverMerchantID": "",
        "BusinessName": "",
        "BillingFileNo": "",
        "TvqNo": "",
        "PostalCode": "",
        "City": "",
        "TpsNo": "",
        "Province": "",
        "ActivitySubSector": "",
        "IdentificationNo": "",
        "Phone": ""
    }
  ```
- **Response Format:** JSON
- **Sample Response:**
  ```json
   [{
        "id": "3KTOdNVn511i8Fw6D1oR",
        "AuthorizationCode": "",
        "Street2": "",
        "Street1": "",
        "CloverMerchantID": "",
        "BusinessName": "",
        "BillingFileNo": "",
        "TvqNo": "",
        "PostalCode": "",
        "City": "",
        "TpsNo": "",
        "Province": "",
        "ActivitySubSector": "",
        "IdentificationNo": "",
        "Phone": ""
    }]
  ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
