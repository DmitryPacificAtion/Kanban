import createAddMoreColumn from "./createAddMoreColumn";
import createNewColumn from "./createNewColumn";
import createColumn from "./createColumn";
import createColumnControls from "./createColumnControls";
import createNotes from "./createNotes";
import createRemove from "./createRemove";

export {
  createAddMoreColumn,
  createNewColumn,
  createColumn,
  createColumnControls,
  createNotes,
  createRemove,
};

/* 
function createNewColumnLegacy(referenceElement) {
  if ('content' in document.createElement('template')) {
    const newColumn = document.getElementById('new-column').content;
    const parent = document.querySelector('.columns-wrapper');
    const inputText = document
      .getElementById('new-column')
      .content.querySelector('.new-column__input').value; // TODO: Filter injections
    const createBtn = newColumn.querySelector('.new-column__create');
    const cancelBtn = newColumn.querySelector('.new-column__cancel');

    if (cancelBtn) {
      cancelBtn.addEventListener('click', (e) => {
        e.target.parentElement.parentElement.remove();
      });
    }
    if (createBtn) {
      createBtn.addEventListener('click', () => console.log(makeHash(inputText + Date.now())));
    }

    parent.insertBefore(newColumn, referenceElement);
  } else {
    alert(
      `Are you using IE 11 or some old browser?\nYou must be kidding!\n Today is ${new Date().getFullYear()}! Go and download a normal browser.\nhttps://www.google.com/intl/en/chrome/`
    );
  }
}

*/
