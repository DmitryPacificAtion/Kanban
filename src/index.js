import './index.scss';
import firebase from 'firebase/app';
import auth from 'firebase/auth';
import FF from 'firebase/functions';
import database from 'firebase/database';
import config from '../firebase-config';
import { renderApp, renderAuth } from './renders';
const firebaseui = require('firebaseui');

(function () {
  initApp();
})();

function initApp() {
  firebase.initializeApp(config);
  firebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      renderApp(user.email, () => firebase.auth().signOut());
    } else {
      renderAuth();
    }
  });
}
