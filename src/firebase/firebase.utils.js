import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAS3O-dogV1AvYwoxf6UA2e1Lghhrk2tgU",
  authDomain: "test-5460d.firebaseapp.com",
  databaseURL: "https://test-5460d.firebaseio.com",
  projectId: "test-5460d",
  storageBucket: "test-5460d.appspot.com",
  messagingSenderId: "637700451937",
  appId: "1:637700451937:web:9dfd5a24d809a7c44b0420",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth) => {
  if (!userAuth) return;

  console.log(userAuth.user.uid);

  const userRef = firebase.firestore().doc(`/users/${userAuth.user.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { email } = userAuth.user;
    console.log(email);

    try {
      await userRef.set({
        email,
      });
    } catch (error) {
      console.log("Error creating user", error);
    }
  }
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export default firebase;