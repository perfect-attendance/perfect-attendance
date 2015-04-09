(function () {
  'use strict';

  // expose the controller to the global scope
  PA.reviewCtrl = function () {
    // imports
    var PA = window.PA;

    var check = function check(attendance) {
      document.getElementId("answer").value(attendance);
    };

    var createReviewTableElement = function (room, date, instructor,
        timeFrom, timeTo, attendance, substitute, substituteInstructor) {
      var tr = document.createElement('tr');
      var createTd = function (content) {
        var td = document.createElement('td');
        td.innerHTML = content;
        tr.appendChild(td);
        return td;
      };
      var roomTd = createTd(room);
      var dateTd = createTd(date);
      var instructorTd = createTd(instructor);
      var timeFromTd = createTd(timeFrom);
      var timeToTd = createTd(timeTo);
      var attendanceTd = createTd(attendance);
      var substituteTd = createTd(substitute);
      var substituteInstructorTd = createTd(substituteInstructor);
      var reviewTableBody = document.querySelector('.pa-review tbody');
      reviewTableBody.appendChild(tr);
    };

    PA.getSchedule(function(schedule) {
      for (var i = 0; i < schedule.length; i++) {
        createReviewTableElement(schedule[i].roomNo, schedule[i].day,
            schedule[i].instructorId);
      };
    });

    var select = document.querySelector('.pa-review #select-1');
    PA.createInstructorSelect(select);
    // Add more code here...
  };
})();
