import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCzhs1ZPntE_dberVSlFM1EAGqNO6FAZBU",
    authDomain: "project-1090609784271865680.firebaseapp.com",
    databaseURL: "https://project-1090609784271865680.firebaseio.com",
    projectId: "project-1090609784271865680",
    storageBucket: "project-1090609784271865680.appspot.com",
    messagingSenderId: "547130601128"
  };

const fire = firebase.initializeApp(config);
export default fire;