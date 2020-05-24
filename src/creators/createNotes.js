import { removeNoteFromColumn } from "../utilities";
import createRemove from "./createRemove";
import { renderNotes } from "../renders";

export default function createNotes(id_col, notes = []) {
  const removeNoteHandler = (id_note) => {    
    removeNoteFromColumn(id_col, id_note);
    renderNotes(id_col);
  };

  // Creating Notes list
  const ul = document.createElement("ul");
  ul.classList.add("column__notes");

  
  notes.forEach(({ id_note, content }) => {
    const li = document.createElement("li");
    li.innerText = content;
    li.setAttribute("id", `${id_note}`);
    li.appendChild(createRemove(() => removeNoteHandler(id_note)));

    // const input = document.createElement('input');
    // input.setAttribute('type', 'text');
    // input.setAttribute('value', content);
    // input.addEventListener('onchange', ({ target }) => {

    // });

    // li.appendChild(input);
    ul.appendChild(li);
  });

  return ul;
}
