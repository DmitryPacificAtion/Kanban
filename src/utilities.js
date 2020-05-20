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

export const lastOrder = loadFromStorage().reduce((acc, cur) => cur.order > acc ? cur.order : acc, 0);
