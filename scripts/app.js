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

  var Module = PA.Module;
  // also modifiles window.PA.mods;

  function renderModuleInLocation() {
    var hash = window.location.hash;
    var pathname = window.location.pathname;
    var mods = window.PA.mods;
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
  var home = new Module('Home', '/', 'views/home.html');
  var rooms = new Module('Rooms', '/rooms', 'views/rooms.html');
  var instructors = new Module('Instructors', '/instructors', 'views/instructors.html');
  var downloads = new Module('Downloads', '/downloads', 'views/downloads.html');
  var about = new Module('About', '/about', 'views/about.html');
  var mods = [home, rooms, instructors, downloads, about];
  PA.mods = mods;

  renderModuleInLocation();
  window.addEventListener('hashchange', renderModuleInLocation);
})();
