import './index.scss';
// window.addEventListener('resize', resizeHandler);
(function(){
  resizeHandler();
})();

function resizeHandler () {
  const windowHeight = window.outerHeight > 1080 ? 1080 : window.outerHeight;
  const notes = document.getElementsByClassName('notes');
  const columns = document.getElementsByClassName('column');
  const wrapper = document.getElementsByClassName('columns-wrapper');
  // if(wrapper.offsetHeight < 1080) {
  //   document.body.setAttribute('style', 'background-size: auto')
  // } else {
  //   document.body.removeAttribute('style')
  // }
  // Object.values(notes).forEach(col => {
  //   col.setAttribute('style', `height: ${col.offsetHeight - 40 - 16 - 30 - 16}px;`);
  // })
  // Object.values(columns).forEach(col => {
  //   col.setAttribute('style', `height: ${windowHeight - 40 - 16}px`);
  // })
}
