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

  // const ui = new firebaseui.auth.AuthUI(firebase.auth());
  renderAuth();
  // ui.start('#firebaseui-auth-container', uiConfig);

  // if (document.location.pathname === '/app') {
  //   const auth = document.getElementById('auth');
  //   // auth !== null && auth.remove();
  //   // console.log('ui', ui);

  //   renderColumns();
  //   renderAddMoreColumn();
  // }
})();

function toggleSignIn() {
  if (firebase.auth().currentUser) {
    // [START signout]
    firebase.auth().signOut();
    // [END signout]
  } else {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a password.');
      return;
    }
    // Sign in with email and pass.
    // [START authwithemail]
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        document.getElementById('quickstart-sign-in').disabled = false;
        // [END_EXCLUDE]
      });
    // [END authwithemail]
  }
  document.getElementById('quickstart-sign-in').disabled = true;
}

/**
 * Handles the sign up button press.
 */
function handleSignUp() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  if (email.length < 4) {
    alert('Please enter an email address.');
    return;
  }
  if (password.length < 4) {
    alert('Please enter a password.');
    return;
  }
  // Create user with email and pass.
  // [START createwithemail]
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
      // [END_EXCLUDE]
    });
  // [END createwithemail]
}

/**
 * Sends an email verification to the user.
 */
function sendEmailVerification() {
  // [START sendemailverification]
  firebase
    .auth()
    .currentUser.sendEmailVerification()
    .then(function () {
      // Email Verification sent!
      // [START_EXCLUDE]
      alert('Email Verification Sent!');
      // [END_EXCLUDE]
    });
  // [END sendemailverification]
}

function sendPasswordReset() {
  var email = document.getElementById('email').value;
  // [START sendpasswordemail]
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(function () {
      // Password Reset Email Sent!
      // [START_EXCLUDE]
      alert('Password Reset Email Sent!');
      // [END_EXCLUDE]
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode == 'auth/invalid-email') {
        alert(errorMessage);
      } else if (errorCode == 'auth/user-not-found') {
        alert(errorMessage);
      }
      console.log(error);
      // [END_EXCLUDE]
    });
  // [END sendpasswordemail];
}

/**
 * initApp handles setting up UI event listeners and registering Firebase auth listeners:
 *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 */
function initApp() {
  // Listening for auth state changes.
  // [START authstatelistener]  // Initialize Firebase
  firebase.initializeApp(config);
  firebase.auth().onAuthStateChanged(function(user) {
    console.log(user);
    
  });
}
