/**
 * General Guidelines:
 * - We will be using ECMAScript5 syntax throughout this application.
 *
 * - Coding Guidelines, we should generally follow:
 *   http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
 *
 * - Remember to always enclose your code in a closure to avoid pollution of
 *   the global scope.
 *
 * Author: Irvin Denzel Torcuato
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

  /**
   * Preferably tableElement has the following template:
   *
   * <div class="table-container">
   *   <table class="data-table">
   *     <thead>
   *       <tr>
   *         <th>---</th>
   *         <th>M</th>
   *         <th>T</th>
   *         <th>W</th>
   *         <th>Th</th>
   *         <th>F</th>
   *         <th>S</th>
   *       </tr>
   *     </thead>
   *     <tbody>
   *     </tbody>
   *   </table>
   * </div>
   */
  var createScheduleTable = function (tableElement) {
    var tbody = tableElement.querySelector('tbody');
    PA.getTimeSlots().forEach(function (timeSlot) {
      var tr = document.createElement('tr');
      var th = document.createElement('th');
      th.innerHTML = timeSlot;
      tr.appendChild(th);
      tbody.appendChild(tr);
    });
  };

  var ready = function () {
    PA.createScheduleTable = createScheduleTable;
    PA.mods = mods;
    renderModuleInLocation();
    addMenuToggle();
    window.addEventListener('hashchange', renderModuleInLocation);
  };

  var isReady = function () {
    return gotInstructors && gotSchedule && gotRooms;
  };

  var gotInstructors;
  PA.getInstructors(function (instructors) {
    gotInstructors = true;
    PA.instructors = instructors; // export instructors object;
    if (isReady()) {
      ready();
    };
  });

  var gotSchedule;
  PA.getSchedule(function (schedule) {
    gotSchedule = true;
    PA.schedule = schedule; // export schedule object;
    if (isReady()) {
      ready();
    };
  });

  var gotRooms;
  PA.getRooms(function (rooms) {
    gotRooms = true;
    PA.rooms = rooms; // export rooms object;
    if (isReady()) {
      ready();
    };
  });
})();
