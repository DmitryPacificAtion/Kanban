import { saveToStorage, loadFromStorage } from '../utilities';

export default function updateColumn(id, title, notes) {
  const data = loadFromStorage();
  const filteredData = data.filter(col => col.id_col !== id);
  saveToStorage(filteredData);
}