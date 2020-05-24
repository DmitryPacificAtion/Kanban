import { makeHash, saveToStorage } from '../utilities';
import { renderColumns, renderColumnControls } from '../renders';

export default function createNewColumn(order) {
  const column = document.createElement('section');
  column.classList.add('new-column');

  // TODO: validation
  const input = document.createElement('input');
  input.classList.add('new-column__input');
  input.setAttribute('placeholder', 'Введите название колонки');
  input.setAttribute('type', 'text');
  const primaryHandler = () => {
    if (input.value) {
      const newColumn = {
        id_col: 'col-' + makeHash(input.value + Date.now()),
        title: input.value,
        order: order + 1,
        notes: [],
      };
      saveToStorage(newColumn);
      renderColumns();
      column.remove();
    } else {
      input.placeholder = 'Поле не может быть пустым';
      input.classList.add('error');
    }
  };
  const secondaryHandler = () => column.remove();
  const handleKeysPress = (e) => {
    const { key } = e || window.event;
    if (key === 'Enter') {
      primaryHandler();
    }
    if (key === 'Escape') {
      secondaryHandler();
    }
  };
  input.addEventListener('keydown', handleKeysPress);
  column.appendChild(input);
  input.focus();

  renderColumnControls(column, 'Добавить колонку', primaryHandler, secondaryHandler);
  return column;
}
