(function () {
  'use strict';

  window.PA.Module = Module; // export to the global scope

  function Module(name, main) {
    // display the Module in the DOM upon creation
    var ul = document.querySelector('aside > ul');
    var li = document.createElement('li');
    li.innerHTML = name;
    ul.appendChild(li);

    this.name = name;
    this.main = main;
    this.view = li;
    this.displayOnClick(true);
  }

  Module.prototype.display = function () {
    var main = document.querySelector('#main-content');
    main.innerHTML = this.main;
  };

  Module.prototype.displayOnClick = function (displayFlag) {
    var thisModule = this;
    this.displayOnClick = function () {
      thisModule.display();
    };
    if (displayFlag) {
      this.view.addEventListener('click', this.displayOnClick);
    } else {
      this.view.removeEventListener('click', this.displayOnClick);
    }
    return this.displayOnClick;
  };
})();
