import { renderHeader, renderColumns, renderAddMoreColumn } from '.';
import root from './root';

export default function renderApp(userName, signOutHandler) {
  root.innerHTML = null;

  renderHeader(userName, signOutHandler);
  renderColumns();
  renderAddMoreColumn();
}