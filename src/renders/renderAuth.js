import { createAuth } from '../creators';
import root from './root';

export default function renderAuth() {
  root.innerHTML = null;

  root.appendChild(createAuth());
}
