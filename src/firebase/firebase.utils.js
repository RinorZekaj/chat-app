import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  // Your app config here
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
