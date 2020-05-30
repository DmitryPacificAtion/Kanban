import './index.scss';
const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/firestore');
import config from '../firebase-config';
import { renderApp, renderAuth } from './renders';
import { createStorage } from './utilities';

(function () {
  initApp();
})();

function initApp() {
  firebase.initializeApp(config);
  const database = firebase.firestore();
  firebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      const docRef = database.collection('boards').doc(user.email);
      docRef
        .get()
        .then((doc) => {
          if (doc && doc.exists) {
            createStorage(doc.data().data);
            renderApp(user.email, () => firebase.auth().signOut());
          } else {
            docRef.set({
              data: [],
            })
            .then(() => {
              createStorage();
              renderApp(user.email, () => firebase.auth().signOut());
            })
            .catch((error) => {
              console.error('Error creating document:', error);
            });
          }
        })
        .catch((error) => {
          console.error('Error getting document:', error);
        });
    } else {
      renderAuth();
    }
  });
}
