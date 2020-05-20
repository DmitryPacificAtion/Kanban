import { createColumn, createNewColumn, createAddMoreColumn, createColumnControls } from "../creators";
import { loadFromStorage } from '../utilities';

const root = document.getElementById("root");

function renderColumns() {
  Object.values(document.querySelectorAll('.column')).forEach(item => item.remove());
  loadFromStorage().forEach(({ id_col, title, notes }) => {
    root.appendChild(createColumn(id_col, title, notes));
  });
}

function renderNewColumn() {
  const isExist = document.querySelector(".new-column");
  if (isExist === null) {
    root.appendChild(createNewColumn());
  } else {
    window.scrollTo(isExist);
  }
}

function renderAddMoreColumn() {
  root.appendChild(createAddMoreColumn());
}

function renderColumnControls(parent, label, primaryHandler, secondaryHandler) {
  parent.appendChild(createColumnControls(label, primaryHandler, secondaryHandler));
}

export { renderColumns, renderNewColumn, renderAddMoreColumn, renderColumnControls };
