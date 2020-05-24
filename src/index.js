import './index.scss';

import { renderAddMoreColumn, renderColumns } from './renders';

(function () {
  renderColumns();
  renderAddMoreColumn();
})();

// + - Handle Enter
// + - Handle Esc
// - Validate empty strings
// - Edit Title
// Fix a bug with 2 colums

// window.addEventListener('resize', resizeHandler);
// function resizeHandler () {
//   const windowHeight = window.outerHeight > 1080 ? 1080 : window.outerHeight;
//   const notes = document.getElementsByClassName('notes');
//   const columns = document.getElementsByClassName('column');
//   const wrapper = document.getElementsByClassName('columns-wrapper');
// }
