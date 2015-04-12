(function () {
  'use strict';

  // expose the controller to the global scope
  PA.instructorsCtrl = function () {
    // imports
    var PA = window.PA;

    var module = this;
    var select = document.querySelector('.pa-instructors-select');
    var table = document.querySelector('.pa-instructors table');
    PA.createScheduleTable(table);
    PA.createInstructorSelect(select);
  };
})();
