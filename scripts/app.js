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
  var reviewCtrl = PA.reviewCtrl;
  var aboutCtrl = PA.aboutCtrl;
  var mods = window.PA.mods;
  // also modifies window.PA.mods;
  // also modifies window.PA.menuIsDisplayed;

  // initialize menu
  var home = new Module('Home', '/', 'views/home.html', homeCtrl);
  var review = new Module('Review', '/review', 'views/review.html', reviewCtrl);
  var rooms = new Module('Rooms', '/rooms', 'views/rooms.html', roomsCtrl);
  var instructors = new Module('Instructors', '/instructors', 'views/instructors.html', instructorsCtrl);
  var about = new Module('About', '/about', 'views/about.html', aboutCtrl);
  var mods = [home, review, rooms, instructors, about];

  var addMenuToggle = function addMenuToggle() {
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
  };

  var renderModuleInLocation = function renderModuleInLocation() {
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

  var ready = function () {
    PA.mods = mods;
    renderModuleInLocation();
    addMenuToggle();
    window.addEventListener('hashchange', renderModuleInLocation);
  };

  var gotInstructors;
  PA.getInstructors(function (instructors) {
    gotInstructors = true;
    PA.instructors = instructors; // export instructors object;
    if (gotInstructors) {
      ready();
    };
  });
})();
