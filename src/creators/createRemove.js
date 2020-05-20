export default function createRemove(removeHandler) {
  const remove = document.createElement('div');
  remove.classList.add('remove');
  remove.addEventListener('click', removeHandler);
  return remove;
}
