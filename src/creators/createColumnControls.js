export default function createColumnControls(label, primaryHandler, secondaryHandler) {
  const controls = document.createElement('div');
  controls.classList.add('new-column__controls');

  const create = document.createElement('button');
  create.classList.add('new-column__create');
  create.addEventListener('click', primaryHandler);
  create.innerText = label;

  const cancel = document.createElement('div');
  cancel.classList.add('new-column__cancel');
  cancel.addEventListener('click', secondaryHandler);

  controls.appendChild(create);
  controls.appendChild(cancel);

  return controls;
}