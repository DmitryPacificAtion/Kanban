export default function createEdit(editHandler) {
  const eidt = document.createElement('div');
  eidt.classList.add('edit');
  eidt.addEventListener('click', editHandler);
  return eidt;
}
