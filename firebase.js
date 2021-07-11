import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBUZ6m3e8qpdmQbS1HXXneat7jXaaoVKg8",
    authDomain: "docs-clone-9a2cc.firebaseapp.com",
    projectId: "docs-clone-9a2cc",
    storageBucket: "docs-clone-9a2cc.appspot.com",
    messagingSenderId: "926557063539",
    appId: "1:926557063539:web:cf50ac213e2fede7349d06"
  };


  const app = !firebase.apps.length 
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

  const db = app.firestore();

  export {db}