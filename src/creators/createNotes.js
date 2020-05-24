import { removeNoteFromColumn, updateNoteInColumn } from '../utilities';
import createRemove from './createRemove';
import { renderNotes } from '../renders';

export default function createNotes(id_col, notes = []) {
  const removeNoteHandler = (id_note) => {
    removeNoteFromColumn(id_col, id_note);
    renderNotes(id_col);
  };
  const primaryHandler = ({ target }) => {
    updateNoteInColumn(id_col, id_note, target.value);
    renderNotes(id_col);
  };
  const handleKeysPress = ({ target, currentTarget }) => {
    console.log('target, currentTarget', target, currentTarget);  
    const { key } = e || window.event;
    if (key === 'Enter') {
      target.blur();
    }
    if (key === 'Escape') {
      target.remove();
      target.innerHTML = target.value;
    };
  }

  // Creating Notes list
  const ul = document.createElement('ul');
  ul.classList.add('column__notes');

  notes.forEach(({ id_note, content }) => {
    const li = document.createElement('li');
    li.innerText = content;
    li.setAttribute('id', `${id_note}`);
    li.appendChild(createRemove(() => removeNoteHandler(id_note)));

    ul.appendChild(li);
  });

  return ul;
}

 
/* 

    const editNoteHandler = () => {
      li.removeEventListener('click', editNoteHandler);
  
      const handleKeysPress = (e) => {
        const { key } = e || window.event;
        if (key === 'Enter') {
          input.blur();
        }
        if (key === 'Escape') {
          input.remove();
          li.innerHTML = title;
        }
      };
  
      const input = document.createElement('input');
      input.setAttribute('type', 'text');
      input.setAttribute('value', title);
  
      input.addEventListener('blur', primaryHandler);
      input.addEventListener('keydown', handleKeysPress);
  
      li.innerHTML = '';
      li.appendChild(input);
      input.focus();

    li.addEventListener('click', editNoteHandler);

    li.appendChild(input);

    };
    
    */
