/**
 * General Guidelines:
 * - We will be using ECMAScript5 syntax throughout this application.
 *
 * - Coding Guidelines, we should generally follow:
 *   http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
 *
 * - Remember to always enclose your code in a closure to avoid pollution of
 *   the global scope.
 */

(function () {
  'use strict';

  var PA = window.PA;
  var Module = PA.Module;
  var homeCtrl = PA.homeCtrl;
  var roomsCtrl = PA.roomsCtrl;
  var instructorsCtrl = PA.instructorsCtrl;
  var downloadsCtrl = PA.downloadsCtrl;
  var aboutCtrl = PA.aboutCtrl;
  var mods = window.PA.mods;
  // also modifies window.PA.mods;
  // also modifies window.PA.menuIsDisplayed;

  function addMenuToggle() {
    PA.menuIsToggled = false;
    var toggleMenuButton = document.querySelector('.pa-controls > .pa-button');
    var displayMenu = function (display) {
      var aside = document.querySelector('main > aside');
      toggleMenuButton.classList.toggle('pa-button-active');
      if (display) {
        aside.style.display = 'initial';
      } else {
        aside.style.display = 'none';
      }
    };
    var toggleMenuClicked = function () {
      PA.menuIsDisplayed = !PA.menuIsDisplayed;
      displayMenu(PA.menuIsDisplayed);
    };
    toggleMenuButton.addEventListener('click', toggleMenuClicked);
  }

  function renderModuleInLocation() {
    var hash = window.location.hash;
    var pathname = window.location.pathname;
    var found = false;
    var renderMod = function (mod) {
      found = true;
      mod.render();
    };
    mods.forEach(function (mod) {
      if (!hash) {
        if (pathname == mod.pathname) {
          renderMod(mod);
        }
      } else {
        if (hash == mod.hash) {
          renderMod(mod);
        }
      }
    });
    if (!found) {
      var notFound = new Module('Not Found', '/notfound', 'views/notfound.html', false);
      notFound.render();
    }
  };

  // initialize menu
  var home = new Module('Home', '/', 'views/home.html', homeCtrl);
  var rooms = new Module('Rooms', '/rooms', 'views/rooms.html', roomsCtrl);
  var instructors = new Module('Instructors', '/instructors', 'views/instructors.html', instructorsCtrl);
  var downloads = new Module('Downloads', '/downloads', 'views/downloads.html', downloadsCtrl);
  var about = new Module('About', '/about', 'views/about.html', aboutCtrl);
  var mods = [home, rooms, instructors, downloads, about];
  PA.mods = mods;


  renderModuleInLocation();
  addMenuToggle();
  window.addEventListener('hashchange', renderModuleInLocation);
})();
