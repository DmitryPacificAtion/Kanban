import { loadFromStorage, saveToStorage } from '../utilities';

export default function removeColumn(id) {
  const data = loadFromStorage();
  const filteredData = data.filter(col => col.id_col !== id);
  saveToStorage(filteredData);
}
