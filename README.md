# NtantaVres

Dependencies:

* Node.js v23.3.0
* npm@10.9.2
* yarn v1.22.22

Before running create the file ./src/config/firebase.config.ts with the following:

```typescript
export const firebaseConfig = {
  apiKey: '<your-api-key>',
  authDomain: '<yout-auth-domain>',
  projectId: '<your-project-id>',
  storageBucket: '<your-storage-bucket>',
  messagingSenderId: '<your-messaging-sender-id>',
  appId: '<your-app-id>',
};
```

Obviously replace the values inside `<...>`

To run do: `yarn install` and then `yarn run dev`

***

# TODO

* Add firestore security rules here