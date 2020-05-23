import { removeColumnFromStorage, updateColumn } from '../utilities';
import createRemove from './createRemove';
import { renderColumns, renderColumnControls } from '../renders';


export default function createColumn(id_col, title, notes) {
  const column = document.createElement('section');
  column.classList.add('column');
  column.setAttribute('id', id_col);

  const header = document.createElement('div');
  header.classList.add('column__title');
  header.innerHTML = title;

  const removeColumnHandler = () => {
    removeColumnFromStorage(id_col);
    renderColumns();
  };

  const editTitleHandler = () => {
    header.removeEventListener('click', editTitleHandler);
    const primaryHandler = ({ target }) => {
      updateColumn(id_col, title, notes);
      console.log(id_col, title, notes);
      console.log('blur', target.value);
      renderColumns();
    }

    const handleKeysPress = (e) => {
      const { key } = e || window.event;
      if(key === 'Enter') {
        primaryHandler()
      }
      if(key === 'Escape') {
        renderColumns();
      }
    };

    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('value', title);
    input.addEventListener('blur', primaryHandler)
    input.addEventListener('keydown', handleKeysPress);

    header.innerHTML = '';
    header.appendChild(input);
  };

  header.addEventListener('click', editTitleHandler);
  header.appendChild(createRemove(removeColumnHandler));
  
  const ul = document.createElement('ul');
  ul.classList.add('column__notes');

  notes.forEach(({ id_note, content }) => {
    const li = document.createElement('li');
    li.setAttribute('id', `note-${id_note}`);

    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('value', content);
    // input.addEventListener('onchange', ({ target }) => {

    // });

    li.appendChild(input);
    ul.appendChild(li);
  });

  const textarea = document.createElement('textarea');
  textarea.setAttribute('placeholder', 'Введите название карточки');
  textarea.setAttribute('rows', '3');
  textarea.classList.add('new-column__input');
  
  const button = document.createElement('button');
  const addButtonHandler = () => {
    button.remove();
    column.appendChild(wrapper);
  };
  button.classList.add('column__add-item');

  button.setAttribute('id', `add-card-${id_col}`);
  button.addEventListener('click', addButtonHandler);
  button.innerText = 'Добавить еще одну карточку';

  column.appendChild(header);
  column.appendChild(ul);

  const wrapper = document.createElement('div');
  wrapper.setAttribute('id', `controls-wrapper-${id_col}`);
  wrapper.appendChild(textarea);
  renderColumnControls(
    wrapper,
    'Добавить карточку',
    () => console.log('Save'),
    () => {
      wrapper.remove();
      column.appendChild(button);
     },
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