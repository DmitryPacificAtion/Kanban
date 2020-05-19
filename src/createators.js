import { makeHash } from "./utilities";
import { renderColumnControls, renderNewColumn } from "./renders";

function createAddMoreColumn() {
  const section = document.createElement("section");
  section.classList.add("column", "last");
  section.setAttribute("id", "add-column");

  const button = document.createElement("button");
  button.classList.add("column__add-item");
  button.innerText = "Добавить еще одну колонку";
  button.addEventListener("click", renderNewColumn);

  section.appendChild(button);
  return section;
}

function createNewColumn() {
  let inputText = null;
  const handleInputChange = ({ target }) => {
    inputText = target.value;
  };
  const primaryHandler = () => {
    console.log(makeHash(inputText));
    column.remove();
  };
  const secondaryHandler = () => column.remove();
  const column = document.createElement("section");
  column.classList.add("new-column");
  column.insertAdjacentHTML(
    "afterbegin",
    `<input type="text" placeholder="Введите название колонки" class="new-column__input" />` // TODO: validation
  );
  renderColumnControls(column, "Добавить колонку", primaryHandler, secondaryHandler);
  column.querySelector(".new-column__input").addEventListener("onchange", handleInputChange);
  return column;
}

function createRemove(id) {
  const remove = document.createElement('div');
  remove.classList.add('remove');
  const removeHandler = id => {
    document.getElementById(id).remove();
  };
  remove.setAttribute('id', id);
  remove.addEventListener("click", () => removeHandler(id));
  
  return remove;
}

function createColumn(id_col, title, notes) {
  const column = document.createElement("section");
  column.classList.add("column");
  column.setAttribute("id", `column-${id_col}`);

  const header = document.createElement('div');
  header.classList.add('column__title');
  header.innerText = title;
  header.appendChild(createRemove(`column-${id_col}`));
  
  const ul = document.createElement("ul");
  ul.classList.add("column__notes");

  notes.forEach(({ id_note, content }) => {
    const li = document.createElement("li");
    li.setAttribute('id', `note-${id_note}`);

    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("value", content);
    // input.addEventListener("onchange", ({ target }) => {

    // });

    li.appendChild(input);
    ul.appendChild(li);
  });

  const textarea = document.createElement("textarea");
  textarea.setAttribute("placeholder", "Введите название карточки");
  textarea.setAttribute("rows", "3");
  textarea.classList.add("new-column__input");
  
  const button = document.createElement("button");
  const addButtonHandler = () => {
    button.remove();
    column.appendChild(wrapper);
  };
  button.classList.add("column__add-item");

  button.setAttribute("id", `add-card-${id_col}`);
  button.addEventListener("click", addButtonHandler);
  button.innerText = "Добавить еще одну карточку";

  column.appendChild(header);
  column.appendChild(ul);

  const wrapper = document.createElement('div');
  wrapper.setAttribute("id", `controls-wrapper-${id_col}`);
  wrapper.appendChild(textarea);
  renderColumnControls(
    wrapper,
    "Добавить карточку",
    () => console.log('Save'),
    () => {
      wrapper.remove();
      column.appendChild(button);
     },
  );

  const el = document.getElementById(`add-card-${id_col}`);

  if(el === null) {
    wrapper.remove();
    column.appendChild(button);
  } else {
    button.remove();
    column.appendChild(wrapper);
  }
   
  return column;
}

function createColumnControls(label, primaryHandler, secondaryHandler) {
  const controls = document.createElement("div");
  controls.classList.add("new-column__controls");

  const create = document.createElement("button");
  create.classList.add("new-column__create");
  create.addEventListener("click", primaryHandler);
  create.innerText = label;

  const cancel = document.createElement("div");
  cancel.classList.add("new-column__cancel");
  cancel.addEventListener("click", secondaryHandler);

  controls.appendChild(create);
  controls.appendChild(cancel);

  return controls;
}

export { createAddMoreColumn, createColumn, createNewColumn, createColumnControls };

/* 
function createNewColumnLegacy(referenceElement) {
  if ("content" in document.createElement("template")) {
    const newColumn = document.getElementById("new-column").content;
    const parent = document.querySelector(".columns-wrapper");
    const inputText = document
      .getElementById("new-column")
      .content.querySelector(".new-column__input").value; // TODO: Filter injections
    const createBtn = newColumn.querySelector(".new-column__create");
    const cancelBtn = newColumn.querySelector(".new-column__cancel");

    if (cancelBtn) {
      cancelBtn.addEventListener("click", (e) => {
        e.target.parentElement.parentElement.remove();
      });
    }
    if (createBtn) {
      createBtn.addEventListener("click", () => console.log(makeHash(inputText + Date.now())));
    }

    parent.insertBefore(newColumn, referenceElement);
  } else {
    alert(
      `Are you using IE 11 or some old browser?\nYou must be kidding!\n Today is ${new Date().getFullYear()}! Go and download a normal browser.\nhttps://www.google.com/intl/en/chrome/`
    );
  }
}

*/
