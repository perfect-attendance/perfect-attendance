(function () {
  'use strict';

  window.PA.Module = Module; // export to the global scope

  function Module(name, aside, main) {
    // display the Module in the DOM upon creation
    var ul = document.querySelector('nav > ul');
    var li = document.createElement('li');
    li.innerHTML = name;
    ul.appendChild(li);

    this.name = name;
    this.aside = aside;
    this.main = main;
    this.view = li;
  }

  Module.prototype.display = function () {
    var aside = document.querySelector('main > aside');
    var main = document.querySelector('#main-content');
    aside.innerHTML = this.aside;
    main.innerHTML = this.main;
  };
})();
