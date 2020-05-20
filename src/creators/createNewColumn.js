import { makeHash, saveToStorage, lastOrder } from '../utilities';
import { renderColumns, renderColumnControls } from '../renders';

export default function createNewColumn() {
  const column = document.createElement('section');
  column.classList.add('new-column');

  let inputText = '';
  // TODO: validation
  const input = document.createElement('input');
  input.classList.add('new-column__input');
  input.setAttribute('placeholder', 'Введите название колонки');
  input.setAttribute('type', 'text');
  const handleInputChange = ({ target }) => {
    inputText = target.value;
  };
  const primaryHandler = () => {
    const newColumn = {
      id_col: 'col-' + makeHash( inputText + Date.now()),
      title: inputText,
      order: lastOrder + 1,
      notes: [],
    }
    dataStorage.push(newColumn);
    saveToStorage(dataStorage);
    renderColumns();
    column.remove();
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