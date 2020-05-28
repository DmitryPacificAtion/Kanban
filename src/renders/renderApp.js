import { renderHeaderPanel, renderColumns, renderAddMoreColumn } from '.';
import root from './root';

export default function renderApp(userName, signOutHandler) {
  root.innerHTML = null;

  renderHeaderPanel(userName, signOutHandler);
  renderColumns();
  renderAddMoreColumn();
}