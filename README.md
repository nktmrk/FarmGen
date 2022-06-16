# FarmGen

## App Info

This repo is a demo for FarmGeneration micro app.

## Tech Stack

**Client:** React, Typescript, Cypress

**Server:** Firestore, Firebase Storage

## Setup environment

- Clone or download this repo (master branch) into your local machine (preferably Mac or Ubuntu).

- Install packages
```bash
  yarn install
```

- Create development env file and fill firebase configuration as the interface.
```bash
touch .env
```

```bash
FIREBASE_API_KEY=<your_api_key>
FIREBASE_AUTH_DOMAIN=<your_auth_domain>
FIREBASE_DATABASE_URL=<your_database_url>
FIREBASE_PROJECT_ID=<your_project_id>
FIREBASE_STORAGE_BUCKET=<your_storage_bucket>
FIREBASE_MESSAGE_SENDER_ID=<your_message_sender_id>
FIREBASE_APP_ID=<your_app_id>
FIREBASE_MEASUREMENT_ID=<your_measurement_id>
```

- Run the app
```bash
 web - expo web
 ios - expo start --ios
 android - expo start --android
```

- You should have acesss to 'http://localhost:19006/' for the running app.

## Running Test (Cypress)

To run tests, run the following command
```bash
  yarn dev
```

## Feedback

If you have any feedback, please reach out to me at johnnor353@gmail.com
