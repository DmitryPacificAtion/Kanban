import { renderNewColumn } from '../renders';

export default function createAddMoreColumn() {
  const section = document.createElement('section');
  section.classList.add('last-column');
  section.setAttribute('id', 'add-column');

  const button = document.createElement('button');
  button.classList.add('column__add-item');
  button.innerText = 'Добавить еще одну колонку';
  button.addEventListener('click', renderNewColumn);

  section.appendChild(button);
  return section;
}