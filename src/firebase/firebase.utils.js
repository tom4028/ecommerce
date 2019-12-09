import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config ={
  apiKey: "AIzaSyAjpQhpU1uCwUp0vrLP6CSnyQWj_uvpUEo",
  authDomain: "crown-db-61ba9.firebaseapp.com",
  databaseURL: "https://crown-db-61ba9.firebaseio.com",
  projectId: "crown-db-61ba9",
  storageBucket: "crown-db-61ba9.appspot.com",
  messagingSenderId: "559402206397",
  appId: "1:559402206397:web:d8fed47bdfd7ed5515e3d4",
  measurementId: "G-915EZDF55B"
};


export const createUserProfileDocument = async (userAuth,additionalData)=>{
  if(!userAuth) return;

  const userRef =  firestore.doc(`users/${userAuth.uid}`);
  const snapShot =   await userRef.get();
  if(!snapShot.exists){
    const { displayName,email } = userAuth;
    const createdAt = new Date();

    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })

    }catch(error){
      console.log('error createing user:',error);
    }
  }
  return userRef;
} 

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  

  const provider = new firebase.auth.GoogleAuthProvider();

  provider.setCustomParameters({prompt:'select_account'});
  export const signInWithGoogle = ()=>auth.signInWithPopup(provider);

  export default firebase;