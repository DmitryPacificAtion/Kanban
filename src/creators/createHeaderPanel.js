export default function createHeaderPanel(userName, signOutHandler) {
  const header = document.createElement('header');
  header.classList.add('login');

  const container = document.createElement('div');
  container.classList.add('login__container');

  const user = document.createElement('div');
  user.classList.add('login__user');
  user.innerText = userName;

  const signOut = document.createElement('button');
  signOut.setAttribute('type', 'button');
  signOut.classList.add('login__signout');
  signOut.innerText = 'Sign Out';
  signOut.addEventListener('click', signOutHandler);

  container.appendChild(user);
  container.appendChild(signOut);
  header.appendChild(container);

  return header;
}
