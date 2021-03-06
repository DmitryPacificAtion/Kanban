import { removeNoteFromColumn, updateNoteInColumn } from '../utilities';
import createRemove from './createRemove';
import { renderColumns } from '../renders';
import createEdit from './createEdit';

export default function createNotes(id_col, notes = []) {
  const removeNoteHandler = (id_note) => {
    removeNoteFromColumn(id_col, id_note);
    renderColumns();
  };
  const primaryHandler = ({ target }, id_note) => {
    if (target.value) {
      updateNoteInColumn(id_col, id_note, target.value);
      renderColumns();
    } else {
      target.classList.add('error');
      target.placeholder = 'Поле не может быть пустым';
    }
  };

  // Creating Notes list
  const ul = document.createElement('ul');
  ul.classList.add('column__notes');

  notes.forEach(({ id_note, order, content }) => {
    const editNoteHandler = (e) => {
      li.removeEventListener('click', editNoteHandler);
      li.innerHTML = '';
      li.classList.remove('note__item');
      li.classList.add('note__item--write');
      li.appendChild(input);
      input.focus();
    };

    const li = document.createElement('li');
    li.innerText = content;
    li.classList.add('note__item');
    li.setAttribute('id', `${id_note}`);
    li.setAttribute('data-order', order);
    li.setAttribute('draggable', true);
    li.appendChild(createRemove(() => removeNoteHandler(id_note)));
    li.appendChild(createEdit(editNoteHandler));

    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('value', content);
    input.addEventListener('blur', (e) => primaryHandler(e, id_note));
    input.addEventListener('keydown', handleKeysPress);

    const handleKeysPress = (e) => {
      const { key } = e || window.event;
      if (key === 'Enter') {
        input.blur();
      }
      if (key === 'Escape') {
        input.remove();
        li.innerHTML = content;
      }
    };

    ul.appendChild(li);
  });

  return ul;
}
