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

export function removeNoteFromColumn(id_col, id_note) {
  const data = loadFromStorage();
  const foundColumn = data.filter(col => col.id_col === id_col)[0];
  const filteredNotes = foundColumn.notes.filter(note => note.id_note !== id_note);
  foundColumn.notes = filteredNotes;
  const filteredData = data.filter(col => col.id_col !== id_col);
  filteredData.push(foundColumn);
  localStorage.setItem('KANBAN-DATA', JSON.stringify(filteredData));
}

export function updateColumnInStorage(id, title, notes = []) {
  if(id && title) {
    const data = loadFromStorage();
    const col = data.filter(item => item.id_col === id)[0];

    col.title = title;
    col.notes = notes;
    localStorage.setItem('KANBAN-DATA', JSON.stringify(data))
    
  } else {
    console.error('Fields {id} and {title} must not be empty!')
  }
}
// export const lastOrder = loadFromStorage().reduce((acc, cur) => cur.order > acc ? cur.order : acc, 0);
