import { removeColumnFromStorage, updateColumnInStorage, makeHash } from '../utilities';
import {createRemove, createNotes} from '.';
import { renderColumns, renderColumnControls, renderNotes } from '../renders';

export default function createColumn(id_col, title, notes) {
  // Creating a column
  const column = document.createElement('section');
  column.classList.add('column');
  column.setAttribute('id', id_col);

  // Creating a title
  const header = document.createElement('div');
  header.classList.add('column__title');
  header.innerHTML = title;

  const removeColumnHandler = () => {
    removeColumnFromStorage(id_col);
    renderColumns();
  };

  const primaryHandler = ({ target }) => {
    updateColumnInStorage(id_col, target.value, notes);
    renderColumns();
  };

  const editTitleHandler = () => {
    header.removeEventListener('click', editTitleHandler);

    const handleKeysPress = (e) => {
      const { key } = e || window.event;
      if (key === 'Enter') {
        input.blur();
      }
      if (key === 'Escape') {
        input.remove();
        header.innerHTML = title;
      }
    };

    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('value', title);

    input.addEventListener('blur', primaryHandler);
    input.addEventListener('keydown', handleKeysPress);

    header.innerHTML = '';
    header.appendChild(input);
    input.focus();
  };

  header.addEventListener('click', editTitleHandler);
  header.appendChild(createRemove(removeColumnHandler));

  // Creating a fields to add notes
  const textarea = document.createElement('textarea');
  textarea.setAttribute('placeholder', 'Введите название карточки');
  textarea.setAttribute('rows', '3');
  textarea.classList.add('new-column__input');
  const handleKeysPress = (e) => {
    const { key } = e || window.event;
    if (key === 'Escape') {
      columnControlsSecondaryHandler();
    }
  };

  textarea.addEventListener('keydown', handleKeysPress)

  const button = document.createElement('button');
  const addButtonHandler = () => {
    button.remove();
    column.appendChild(wrapper);
  };
  button.classList.add('column__add-item');
  button.setAttribute('id', `add-card-${id_col}`);
  button.addEventListener('click', addButtonHandler);
  button.innerText = 'Добавить еще одну карточку';

  const wrapper = document.createElement('div');
  wrapper.setAttribute('id', `controls-wrapper-${id_col}`);
  wrapper.appendChild(textarea);
  column.appendChild(header);
  column.appendChild(createNotes(id_col, notes));

  const columnControlsPrimaryHandler = () => {
    if (textarea.value) {
      const note = {
        id_col,
        id_note: 'note-' + makeHash(textarea.value + Date.now()),
        order: notes.length + 1,
        content: textarea.value,
      };
      notes.push(note);
      updateColumnInStorage(id_col, title, notes);
      renderNotes(id_col);
      textarea.value = '';
    }
  }

  const columnControlsSecondaryHandler = () => {
    wrapper.remove();
    column.appendChild(button);
    textarea.value = '';
  };

  renderColumnControls(
    wrapper,
    'Добавить карточку',
    columnControlsPrimaryHandler,
    columnControlsSecondaryHandler,
  );

  const el = document.getElementById(`add-card-${id_col}`);
  if(el === null) {
    wrapper.remove();
    column.appendChild(button);
  } else {
    button.remove();
    column.appendChild(wrapper);
  }

  return column;
}
