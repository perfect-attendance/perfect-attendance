(function () {
  'use strict';

  window.PA.Module = Module; // export to the global scope
  // also modifies window.location.pathname

  var PA = window.PA;
  var currentModule = PA.currentModule;
  var homeCtrl = PA.homeCtrl;

  function Module(name, pathname, viewUrl, controller, attachToMenu) {
    this.name = name;
    this.pathname = pathname;
    this.hash = '#' + pathname;
    this.viewUrl = viewUrl;
    this.controller = controller;
    if (attachToMenu !== false) {
      this.attachToMenu();
      this.renderOnClick(true);
    }
  }

  Module.prototype.render = function () {
    var thisModule = this;
    var hash = window.location.hash;
    var showInDom = function (mod) {
      var main = document.querySelector('#main-content');
      thisModule.mainView = main;
      main.innerHTML = thisModule.main;
      if (typeof thisModule.controller === 'function') thisModule.controller();
    };
    if (hash) {
      window.location.href = window.location.href.replace(hash, this.hash);
    }
    window.location.hash = this.hash;
    currentModule = this;
    if (!this.fetched) {
      // AJAX the view
      var xhr = new XMLHttpRequest();
      xhr.open('GET', thisModule.viewUrl, true);
      xhr.responseType = 'text';
      xhr.onload = function (e) {
        thisModule.main = this.response;
        showInDom();
        thisModule.fetched = true;
      };
      xhr.send();
    } else {
      showInDom();
    }
  };

  Module.prototype.renderOnClick = function (renderFlag) {
    var thisModule = this;
    this.renderOnClick = function () {
      thisModule.render();
    };
    if (renderFlag) {
      this.menuView.addEventListener('click', this.renderOnClick);
    } else {
      this.menuView.removeEventListener('click', this.renderOnClick);
    }
    return this.renderOnClick;
  };

  Module.prototype.attachToMenu = function () {
    // render the Module in the DOM upon creation
    var ul = document.querySelector('aside > ul');
    var li = document.createElement('li');
    li.innerHTML = this.name;
    ul.appendChild(li);
    this.menuView = li;
  };
})();
