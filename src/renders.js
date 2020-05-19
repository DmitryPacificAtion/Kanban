import mockedData from "./mockedData.json";
import { createColumn, createNewColumn, createAddMoreColumn, createColumnControls } from "./createators";

const root = document.getElementById("root");

const MODE = {
  READ: true,
  WRITE: false,
};


let lastOrer = 0;
function renderColum() {
  mockedData.forEach(({ id_col, title, notes }) => {
    // lastOrer = order > lastOrer ? order : lastOrer;
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

export { renderColum as renderColumn, renderNewColumn, renderAddMoreColumn, renderColumnControls };
