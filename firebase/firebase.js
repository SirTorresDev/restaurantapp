import firebaseApp from 'firebase/compat/app';
import 'firebase/compat/firestore';

import firebaseConfig from './config';

if(!firebaseApp.apps.length){
    firebaseApp.initializeApp(firebaseConfig);
}

const firebase = {
    db: firebaseApp.firestore()
};

export default firebase;