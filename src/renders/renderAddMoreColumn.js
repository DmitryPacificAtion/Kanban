import root from './root';
import { createAddMoreColumn } from '../creators';

export default function renderAddMoreColumn() {
  root.appendChild(createAddMoreColumn());
}
