import { createHeaderPanel } from '../creators';
import root from './root';

export default function renderHeaderPanel(userName, signOutHandler) {
  root.appendChild(createHeaderPanel(userName, signOutHandler));
}