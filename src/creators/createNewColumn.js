import { makeHash, saveToStorage } from '../utilities';
import { renderColumns, renderColumnControls } from '../renders';

export default function createNewColumn(order) {
  const column = document.createElement('section');
  column.classList.add('new-column');

  let inputText = '';
  const input = document.createElement('input');
  input.classList.add('new-column__input');
  input.setAttribute('placeholder', 'Введите название колонки');
  input.setAttribute('type', 'text');
  const handleInputChange = ({ target }) => {
    inputText = target.value;
  };
  const primaryHandler = () => {
    if(inputText) {
    const newColumn = {
      id_col: 'col-' + makeHash( inputText + Date.now()),
      title: inputText,
      order: order + 1,
      notes: [],
    }
    saveToStorage(newColumn);
    renderColumns();
    column.remove();
    } else {
      input.placeholder = 'Поле не может быть пустым'
      input.classList.add('error')
    }
  };
  const secondaryHandler = () => column.remove();
  const handleKeysPress = (e) => {
    const { key } = e || window.event;
    if(key === 'Enter') {
      handleInputChange(e);
      primaryHandler();
    }
    if(key === 'Escape') {
      secondaryHandler()
    }
  };
  input.addEventListener('change', handleInputChange);
  input.addEventListener('keydown', handleKeysPress);
  column.appendChild(input);
 
  renderColumnControls(column, 'Добавить колонку', primaryHandler, secondaryHandler);
  return column;
}