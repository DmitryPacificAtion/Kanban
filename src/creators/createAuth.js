import firebase from 'firebase/app';
export default function createAuth() {
  const auth = document.createElement('div');
  auth.classList.add('auth-container');

  const firebaseContainer = document.createElement('form');
  firebaseContainer.classList.add('auth');
  firebaseContainer.addEventListener('submit', e => {
    e.preventDefault();
    if(e.submitter.getAttribute('name') === 'signin') {
      toggleSignIn();
    // } else if(e.submitter.getAttribute('name') === 'verify-email') {
    //   sendEmailVerification()
    } else if(e.submitter.getAttribute('name') === 'reset-passw') {
      sendPasswordReset();
    } else {
      handleSignUp();
    }
  });

  const h1 = document.createElement('h1');
  h1.innerText = 'Log in';
  h1.classList.add('auth__title');

  const p = document.createElement('p');
  p.innerText =
    'Enter an email and password below and either sign in to an existing account or sign up';
  p.classList.add('auth__description');

  const emailField = document.createElement('input');
  emailField.setAttribute('type', 'text');
  emailField.setAttribute('name', 'email');
  emailField.setAttribute('placeholder', 'Email');
  emailField.setAttribute('id', 'auth__input--email');
  emailField.innerText =
    'Enter an email and password below and either sign in to an existing account or sign up';
  emailField.classList.add('auth__input');

  const passwField = document.createElement('input');
  passwField.setAttribute('type', 'password');
  passwField.setAttribute('name', 'password');
  passwField.setAttribute('placeholder', 'Password');
  passwField.setAttribute('id', 'auth__input--password');
  passwField.innerText =
    'Enter an email and password below and either sign in to an existing account or sign up';
  passwField.classList.add('auth__input');

  const signIn = document.createElement('button');
  signIn.setAttribute('name', 'signin');
  signIn.setAttribute('type', 'submit');
  signIn.classList.add('auth__button', 'auth__button--secondary');
  signIn.innerText = 'Sign In';
  // signIn.addEventListener('click', toggleSignIn);

  const signUp = document.createElement('button');
  signUp.setAttribute('name', 'signup');
  signUp.setAttribute('type', 'submit');
  signUp.classList.add('auth__button', 'auth__button--primary');
  signUp.innerText = 'Sign Up';

  const signWrapper = document.createElement('div');
  signWrapper.classList.add('auth__sign-wrapper');

  // const verifyEmail = document.createElement('button');
  // verifyEmail.setAttribute('name', 'verify-email');
  // verifyEmail.classList.add('auth__button');
  // verifyEmail.innerText = 'Send Email Verification';
  // verifyEmail.setAttribute('type', 'submit');

  const resetPasw = document.createElement('button');
  resetPasw.setAttribute('name', 'reset-passw');
  resetPasw.classList.add('auth__button');
  resetPasw.innerText = 'Send Password Reset Email';
  resetPasw.setAttribute('type', 'submit');

  firebaseContainer.appendChild(h1);
  firebaseContainer.appendChild(p);
  firebaseContainer.appendChild(emailField);
  firebaseContainer.appendChild(passwField);
  signWrapper.appendChild(signIn);
  signWrapper.appendChild(signUp);
  firebaseContainer.appendChild(signWrapper);
  // firebaseContainer.appendChild(verifyEmail);
  firebaseContainer.appendChild(resetPasw);

  const toggleSignIn = () => {
    console.log('currentUser', firebase.auth().currentUser);
    
    if (firebase.auth().currentUser) {
      firebase.auth().signOut();
    } else {
      const email = emailField.value;
      const password = passwField.value;
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Password is too weak.');
        return;
      }
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(result => {
          console.log('result', result);
          return result;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.error(error);
          signIn.disabled = false;
        });
    }
    signIn.disabled = true;
  };

  const handleSignUp = () => {
    const email = emailField.value;
    const password = passwField.value;
    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a password.');
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.error(error);
      });
  };

  // const sendEmailVerification = () => {
  //   firebase
  //     .auth()
  //     .currentUser.sendEmailVerification()
  //     .then(() => {
  //       alert('Email Verification Sent!');
  //     });
  // };

  const sendPasswordReset = () => {
    const email = emailField.value;
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        alert('Password Reset Email Sent!');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode == 'auth/invalid-email') {
          alert(errorMessage);
        } else if (errorCode == 'auth/user-not-found') {
          alert(errorMessage);
        }
        console.error(error);
      });
  };

  setTimeout(() => {
    auth.parentNode.style.bottom = 0;
  }, 0);

  auth.appendChild(firebaseContainer);

  return auth;
}
