export default function createSpinner() {
  const spinner = document.createElement('div');
  spinner.classList.add('loader');
  spinner.setAttribute('id', 'loader');
  return spinner;
}
