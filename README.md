# NtantaVres

Αθανάσιος Κυπριανός 1115202200082
Δαμιανός Πούλιας 1115202100160
Χρυσοβαλάντου Φιλτικάκη 1115202100205

Στην παρούσα εργασία υλοποιήθηκε η ιστοσελίδα "NtantaVres", με βάση τις προδιαγραφές που αναφέρονται στην εκφώνηση, όπως
και τους ευρετικούς κανόνες του Nielsen. Η εφαρμογή προσφέρει τη δυνατότητα σε γονείς να αναζητήσουν και να συνεργαστούν
με νταντάδες, όπως και σε νταντάδες να αναζητήσουν και να συνεργαστούν με γονείς, με εξατομικευμένες εμπειρίες και για
τις δύο κατηγορίες χρηστών της.

Η ροή συνεργασίας μεταξύ των δύο κατηγοριών χρηστών έχει ως εξής:

- Ο γονέας αναζητά με τα κατάλληλα φίλτρα την ιδανική νταντά
- Επιλέγει την αγγελία της νταντάς που τον ενδιαφέρει και ανακατευθύνεται στο προφίλ της
- Στο προφίλ της νταντάς εμφανίζονται οι μήνες κατά τους οποίους είναι διαθέσιμη. Από αυτούς τους μήνες ο χρήστης
  παρακινείται να επιλέξει έναν για να προγραμματιστεί το ραντεβού.
- Όταν επιλεγεί ένας μήνας, ζητούνται επιπλέον πληροφορίες για το ραντεβού, όπως ακριβής ώρα και ημερομηνία και
  τοποθεσία.
- Έπειτα, η νταντά θα ανοίξει το προφίλ της και θα εγκρίνει το ραντεβού.
- Αφού γίνει αυτό, ο γονιός έχει τη δυνατότητα να κάνει αίτητη για συνεργασία, από το Tab με τα ραντεβού. Για να
  ολοκληρωθεί η αίτηση, πρέπει αρχικά να τη συμπληρώσει και έπειτα να την υπογράψει. Αν επιθυμεί μπορεί να την
  αποθηκεύσει προσωρινά, προτού την υπογράψει.
- Όταν υπογράψει ο γονιός, μένει μόνο να υπογράψει και η νταντά. Η νταντά πρέπει να κατεθυνθεί στο Tab "Συνεργασίες", να
  υπογράψει την αίτηση και να την υποβάλει.
- Αφού λήξει η συνεργασία, αναμένεται η πληρωμή από τον γονιό, η οποία πραγματοποιείται από το Tab "Συνεργασίες",
  πατώντας πάνω στο Ονοματεπώνυμο που αντιστοιχεί στην νταντά. Από εκεί πραγματοποιούνται και οι αξιολογήσεις.
- Στο Tab "Πληρωμές" μπορεί ο χρήστης να δει το ιστορικό των πληρωμών του.

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

# Firestore rules

```ts

rules_version = '2';

service
cloud.firestore
{
  match / databases / { database }
  /documents {
  match / user / { uuid }
  {
    allow
    update, delete
  :
    if request.auth != null && request.auth.uid == uuid;
    allow
    create: if request.auth != null;
    allow
    read: if true;

    match / avatar / { document =** }
    {
      allow
      write: if request.auth != null && request.auth.uid == uuid;
      allow
      read: if true;
    }
    match / documentation / { document =** }
    {
      allow
      write: if request.auth != null && request.auth.uid == uuid;
      allow
      read: if true;
    }
    match / ratings / { document =** }
    {
      allow
      create: if request.auth != null && request.resource.data.puid == request.auth.uid;
      allow
      read: if true;
    }
  }

  match / parent_ad / { uuid }
  {
    allow
    write: if request.auth != null && request.auth.uid == uuid;
    allow
    read: if true;
  }

  match / babysitter_ad / { uuid }
  {
    allow
    write: if request.auth != null && request.auth.uid == uuid;
    allow
    read: if true;
  }

  match / babysitter_traits / { uuid }
  {
    allow
    write: if request.auth != null && request.auth.uid == uuid;
    allow
    read: if true;
  }

  match / availability / { uuid }
  {
    allow
    write: if request.auth != null && request.auth.uid == uuid;
    allow
    read: if true;
  }

  match / meeting / { document =** }
  {
    allow
    create, update
  :
    if request.auth != null &&
      (request.resource.data.puid == request.auth.uid ||
        request.resource.data.buid == request.auth.uid);
    allow
    read, delete
  :
    if request.auth != null &&
      (resource.data.puid == request.auth.uid ||
        resource.data.buid == request.auth.uid);
  }
  match / collab / { document =** }
  {
    allow
    create:
      if request.auth != null &&
        (request.resource.data.puid == request.auth.uid ||
          request.resource.data.buid == request.auth.uid);
    allow
    read, delete, update
  :
    if request.auth != null &&
      (resource.data.puid == request.auth.uid ||
        resource.data.buid == request.auth.uid);
  }
  match / payment / { document =** }
  {
    allow
    write:
      if request.auth != null &&
        (request.resource.data.puid == request.auth.uid &&
          request.resource.data.collaboration.puid == request.auth.uid ||
          request.resource.data.buid == request.auth.uid &&
          request.resource.data.collaboration.buid == request.auth.uid)
        allow
    read:
      if request.auth != null &&
        (resource.data.puid == request.auth.uid ||
          resource.data.buid == request.auth.uid);
  }
}
}
```