import root from './root';
import { createSpinner } from '../creators';

export default function isLoaderVisible(flag = true) {
  const spinner = document.getElementById('loader');
  if (spinner) {
    spinner.remove();
  }
  let timeout;
  if (flag) {
    root.appendChild(createSpinner());
  } else {
    timeout = setTimeout(() => {
      document.getElementById('loader').remove();
    }, 1000);
  }
  clearTimeout(timeout);
}
