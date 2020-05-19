import "./index.scss";

import { renderAddMoreColumn, renderColumn } from "./renders";

(function () {
  renderColumn();
  renderAddMoreColumn();
})();

// Save to storage
// Load from storage
// Create hash from string

// window.addEventListener('resize', resizeHandler);
// function resizeHandler () {
//   const windowHeight = window.outerHeight > 1080 ? 1080 : window.outerHeight;
//   const notes = document.getElementsByClassName('notes');
//   const columns = document.getElementsByClassName('column');
//   const wrapper = document.getElementsByClassName('columns-wrapper');
// }
