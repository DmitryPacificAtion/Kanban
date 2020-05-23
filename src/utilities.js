const crypto = require('crypto');

const isArray = (item) => item && typeof item !== 'string' && item.hasOwnProperty('length')

export function makeHash(text) {
  return crypto.createHash('sha1').update(text).digest('hex');
}

export function saveToStorage(data) {
  const stoge = loadFromStorage();
  stoge.push(data)
  localStorage.setItem('KANBAN-DATA', JSON.stringify(stoge));
}

export function loadFromStorage() {
  const data = JSON.parse(localStorage.getItem('KANBAN-DATA'));
  return isArray(data) ? data : [];
}

export function removeColumnFromStorage(id) {
  const data = loadFromStorage();
  const filteredData = data.filter(col => col.id_col !== id);
  localStorage.setItem('KANBAN-DATA', JSON.stringify(filteredData));
}

export function updateColumn(id, title, notes = []) {
  if(id && title) {
    const data = loadFromStorage();
    const col = data.filter( item => item.id_col === id);
    col.title = title;
    col.notes = notes;
      
    saveToStorage(data);
  } else {
    console.error('Fields {id} and {title} must not be empty!')
  }
}
// export const lastOrder = loadFromStorage().reduce((acc, cur) => cur.order > acc ? cur.order : acc, 0);
