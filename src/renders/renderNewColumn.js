import root from './root';
import { createNewColumn } from '../creators';
import { loadFromStorage } from '../utilities';

export default function renderNewColumn() {
  const newCol = document.querySelector('.new-column');
  if (newCol === null) {
    const order = loadFromStorage().length;
    const col = createNewColumn(order);
    root.appendChild(col);
    col.children[0].focus();
  } else {
    window.scrollTo(newCol);
  }
}
