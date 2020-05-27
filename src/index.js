import './index.scss';
import firebase from 'firebase/app';
import auth from 'firebase/auth';
import FF from 'firebase/functions';
import database from 'firebase/database';
import config from '../firebase-config';
import { renderAddMoreColumn, renderColumns, renderAuth } from './renders';
const firebaseui = require('firebaseui');
let data = null;
// const anonymousUser = firebase.auth().currentUser;

const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
    uiShown: function () {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none';
    },
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  // signInFlow: 'popup',
  signInSuccessUrl: '/app',
  autoUpgradeAnonymousUsers: true,
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  // Terms of service url.
  tosUrl: '#t-o-f',
  // Privacy policy url.
  privacyPolicyUrl: '#policy',
};

(function () {
  initApp();
  renderAuth();

  // const ui = new firebaseui.auth.AuthUI(firebase.auth());
  // ui.start('#firebaseui-auth-container', uiConfig);

  // if (document.location.pathname === '/app') {
  //   const auth = document.getElementById('auth');
  //   // auth !== null && auth.remove();
  //   // console.log('ui', ui);

  //   renderColumns();
  //   renderAddMoreColumn();
  // }
})();


/**
 * initApp handles setting up UI event listeners and registering Firebase auth listeners:
 *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 */
function initApp() {
  firebase.initializeApp(config);
  firebase.auth().onAuthStateChanged(user => {
    console.log('user', user);
    
    // if(user) {
    //   window.location.href = '/app';
    // } else {
    //   window.location.href = '/';
    // }
  });
}
