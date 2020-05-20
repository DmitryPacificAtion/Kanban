const crypto = require('crypto');

export function makeHash(text) {
  return crypto.createHash('sha1').update(text).digest('hex');
}

export function saveToStorage(data) {
  localStorage.setItem('KANBAN-DATA', JSON.stringify(data));
}

export function loadFromStorage() {
  const data = localStorage.getItem('KANBAN-DATA');
  return data && data.length ? JSON.parse(data) : [];
}

export function removeColumn(id) {
  const data = loadFromStorage();
  const filteredData = data.filter(col => col.id_col !== id);
  saveToStorage(filteredData);
}
