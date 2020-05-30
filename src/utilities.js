const crypto = require('crypto');
const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/firestore');

const isArray = (item) => item && typeof item !== 'string' && item.hasOwnProperty('length');

const findColumn = (id) => loadFromStorage().filter(({ id_col }) => id_col === id)[0];
const removeColumn = (id) => loadFromStorage().filter(({ id_col }) => id_col !== id);
const updateDatabase = (data) => {
  firebase
    .firestore()
    .collection('boards')
    .doc(firebase.auth().currentUser.email)
    .update({
      data,
    })
    .catch((error) => console.error('Data updating error:', error));
};

export function makeHash(text) {
  return crypto.createHash('sha1').update(text).digest('hex');
}

export function saveToStorage(data) {
  const storage = loadFromStorage();
  storage.push(data);
  localStorage.setItem('KANBAN-DATA', JSON.stringify(storage));
  updateDatabase(JSON.stringify(storage))
}

export function createStorage(stringifyJson = '[]') {
  killLocalStorage();
  localStorage.setItem('KANBAN-DATA', stringifyJson);
}

export function loadFromStorage() {
  const data = JSON.parse(localStorage.getItem('KANBAN-DATA'));
  return data !== null && isArray(data) ? data : [];
}

export function removeColumnFromStorage(id) {
  const data = JSON.stringify(removeColumn(id));
  localStorage.setItem('KANBAN-DATA', data);
  updateDatabase(data);
}

export function removeNoteFromColumn(id_col, id_note) {
  const col = findColumn(id_col);
  col.notes = col.notes
    .filter((note) => note.id_note !== id_note)
    .map((note, index) => {
      note.order = index + 1;
      return note;
    });
  const newData = removeColumn(id_col);
  newData.push(col);
  newData.sort((p, n) => {
    if (p && p.order && n && n.order) {
      return p.order - n.order;
    }
    return false;
  });
  localStorage.setItem('KANBAN-DATA', JSON.stringify(newData));
  updateDatabase(JSON.stringify(newData));
}

export function updateColumnInStorage(id_col, title, notes = []) {
  if (id_col && title) {
    const col = findColumn(id_col);
    const newData = removeColumn(id_col);
    col.title = title;
    col.notes = notes;
    newData.push(col);
    newData.sort((p, n) => {
      if (p && p.order && n && n.order) {
        return p.order - n.order;
      }
      return false;
    });
    localStorage.setItem('KANBAN-DATA', JSON.stringify(newData));
    updateDatabase(JSON.stringify(newData));
  }
}

export function updateNoteInColumn(id_col, id_note, content) {
  if (id_col && id_note && content) {
    const col = findColumn(id_col);
    const newData = removeColumn(id_col);
    col.notes.filter((note) => note.id_note === id_note)[0].content = content;
    newData.push(col);
    newData.sort((p, n) => {
      if (p && p.order && n && n.order) {
        return p.order - n.order;
      }
      return false;
    });
    localStorage.setItem('KANBAN-DATA', JSON.stringify(newData));
    updateDatabase(JSON.stringify(newData));
  }
}

export function killLocalStorage() {
  localStorage.removeItem('KANBAN-DATA')
}
