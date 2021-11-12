import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDD0Zn3D-H8-fsOKai8YlQxt5g1loESb6s",
  authDomain: "maisumgamertag.firebaseapp.com",
  projectId: "maisumgamertag",
  storageBucket: "maisumgamertag.appspot.com",
  messagingSenderId: "116523980902",
  appId: "1:116523980902:web:8938b022ed128a7376b5a7"
  // apiKey: "AIzaSyCqsujHpPTf2rj88HV9ud-jtgrmfa8et_w",
  // authDomain: "gamertaggamertag-ec7a8.firebaseapp.com",
  // projectId: "gamertaggamertag-ec7a8",
  // storageBucket: "gamertaggamertag-ec7a8.appspot.com",
  // messagingSenderId: "186609917907",
  // appId: "1:186609917907:web:864c8fc4988c254e8f1926"
// };
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}
export default firebase;
