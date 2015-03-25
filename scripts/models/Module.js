(function () {
  'use strict';

  window.PA.Module = Module; // export to the global scope
  // also modifies window.location.pathname

  var PA = window.PA;
  var currentModule = PA.currentModule;

  function Module(name, pathname, viewUrl, attachToMenu) {
    this.name = name;
    this.pathname = pathname;
    this.hash = '#' + pathname;
    this.viewUrl = viewUrl;
    if (attachToMenu !== false) {
      this.attachToMenu();
      this.renderOnClick(true);
    }
  }

  Module.prototype.render = function () {
    var hash = window.location.hash;
    if (hash) {
      window.location.href = window.location.href.replace(hash, this.hash);
    }
    window.location.hash = this.hash;
    currentModule = this;
    if (!this.fetched) {
      // AJAX the view
      var thisModule = this;
      var xhr = new XMLHttpRequest();
      xhr.open('GET', thisModule.viewUrl, true);
      xhr.responseType = 'text';
      xhr.onload = function (e) {
        thisModule.main = this.response;
        var main = document.querySelector('#main-content');
        main.innerHTML = thisModule.main;
        thisModule.fetched = true;
      };
      xhr.send();
    } else {
      var main = document.querySelector('#main-content');
      main.innerHTML = this.main;
    }
  };

  Module.prototype.renderOnClick = function (renderFlag) {
    var thisModule = this;
    this.renderOnClick = function () {
      thisModule.render();
    };
    if (renderFlag) {
      this.view.addEventListener('click', this.renderOnClick);
    } else {
      this.view.removeEventListener('click', this.renderOnClick);
    }
    return this.renderOnClick;
  };

  Module.prototype.attachToMenu = function () {
    // render the Module in the DOM upon creation
    var ul = document.querySelector('aside > ul');
    var li = document.createElement('li');
    li.innerHTML = this.name;
    ul.appendChild(li);
    this.view = li;
  };
})();
