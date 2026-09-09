# NtantaVres

A web application that connects parents looking for a babysitter ("ntanta" in Greek) with babysitters looking for work. Built with React, TypeScript, Vite, Material UI, and Firebase.

## Team

| Name                  | Student ID      |
| --------------------- | --------------- |
| Athanasios Kyprianos  | 1115202200082   |
| Damianos Poulias      | 1115202100160   |
| Chrysovalantou Filtikaki | 1115202100205 |

Repository: <https://github.com/thanoskyprianos/ntantavres>

## About

NtantaVres was developed following the assignment specifications and Nielsen's usability heuristics. The application allows parents to search for and collaborate with babysitters, and babysitters to search for and collaborate with parents, offering a personalized experience for both user types.

## Collaboration flow

The collaboration flow between the two user types works as follows:

1. The parent searches for the ideal babysitter using the appropriate filters.
2. They select the babysitter's ad they are interested in and are redirected to her profile.
3. The babysitter's profile shows the months during which she is available. The parent is encouraged to pick one of these months to schedule a meeting.
4. Once a month is selected, additional meeting details are requested, such as the exact date, time, and location.
5. The babysitter then opens her profile and approves the meeting.
6. After that, the parent can submit a collaboration request from the Meetings tab. To complete the request, they must first fill it in and then sign it. They may save it temporarily before signing, if desired.
7. Once the parent signs, the only remaining step is for the babysitter to sign as well. The babysitter goes to the "Collaborations" tab, signs the request, and submits it.
8. After the collaboration ends, the parent is expected to make the payment, which is done from the "Collaborations" tab by clicking on the babysitter's full name. Ratings are also submitted from there.
9. In the "Payments" tab, users can view their payment history.

## Prerequisites

- Node.js v23.3.0
- npm@10.9.2
- yarn v1.22.22

## Getting started

1. Create the file `./src/config/firebase.config.ts` with the following contents:

   ```typescript
   export const firebaseConfig = {
     apiKey: '<your-api-key>',
     authDomain: '<your-auth-domain>',
     projectId: '<your-project-id>',
     storageBucket: '<your-storage-bucket>',
     messagingSenderId: '<your-messaging-sender-id>',
     appId: '<your-app-id>',
   };
   ```

   Replace the values inside `<...>` with your own Firebase project's values.

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Start the development server:

   ```bash
   yarn run dev
   ```

Other available scripts:

```bash
yarn run build    # type-check and build for production
yarn run preview  # preview the production build locally
yarn run lint     # run ESLint
yarn run format   # format the codebase with Prettier
```

---

# Firestore rules

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /user/{uuid} {
      allow update, delete: if request.auth != null && request.auth.uid == uuid;
      allow create: if request.auth != null;
      allow read: if true;

      match /avatar/{document=**} {
      	allow write: if request.auth != null && request.auth.uid == uuid;
        allow read: if true;
      }
      match /documentation/{document=**} {
      	allow write: if request.auth != null && request.auth.uid == uuid;
        allow read: if true;
      }
      match /ratings/{document=**} {
      	allow create: if request.auth != null && request.resource.data.puid == request.auth.uid;
        allow read: if true;
      }
    }

    match /parent_ad/{uuid} {
    	allow write: if request.auth != null && request.auth.uid == uuid;
      allow read: if true;
    }

    match /babysitter_ad/{uuid} {
    	allow write: if request.auth != null && request.auth.uid == uuid;
      allow read: if true;
    }

    match /babysitter_traits/{uuid} {
    	allow write: if request.auth != null && request.auth.uid == uuid;
      allow read: if true;
    }

    match /availability/{uuid} {
    	allow write: if request.auth != null && request.auth.uid == uuid;
      allow read: if true;
    }

    match /meeting/{document=**} {
    	allow create, update:
        if request.auth != null &&
           (request.resource.data.puid == request.auth.uid ||
            request.resource.data.buid == request.auth.uid);
      allow read, delete:
      	if request.auth != null &&
           (resource.data.puid == request.auth.uid ||
            resource.data.buid == request.auth.uid);
    }
    match /collab/{document=**} {
    	allow create:
        if request.auth != null &&
           (request.resource.data.puid == request.auth.uid ||
            request.resource.data.buid == request.auth.uid);
      allow read, delete, update:
      	if request.auth != null &&
           (resource.data.puid == request.auth.uid ||
            resource.data.buid == request.auth.uid);
    }
    match /payment/{document=**} {
    	allow write:
      	if request.auth != null &&
        	(request.resource.data.puid == request.auth.uid &&
          request.resource.data.collaboration.puid == request.auth.uid ||
          request.resource.data.buid == request.auth.uid &&
          request.resource.data.collaboration.buid == request.auth.uid)
      allow read:
      	if request.auth != null &&
           (resource.data.puid == request.auth.uid ||
            resource.data.buid == request.auth.uid);
    }
  }
}
```
