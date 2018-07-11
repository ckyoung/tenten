new WOW().init();

window.addEventListener('keydown', function(e) {
  if(e.shiftKey) {
    let shiftAlert = document.querySelector('#shift-alert');

    shiftAlert.classList.add('alert');
  }
});

window.addEventListener('keyup', function(e) {
  if(e.keyCode == 16){
    let shiftAlert = document.querySelector('#shift-alert');

    shiftAlert.classList.remove('alert');
  }
});

const app = new Vue({
  el: '#root',
  data: {
    hamburgerToggle: false,
    showHiddenFooter: false
  }
})