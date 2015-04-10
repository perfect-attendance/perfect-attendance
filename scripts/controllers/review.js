(function () {
  'use strict';

  // expose the controller to the global scope
  PA.reviewCtrl = function () {
    // imports
    var PA = window.PA;

    var check = function check(attendance) {
      document.getElementId("answer").value(attendance);
    };

    var findInstructor = function (id) {
      var found = {};
      var instructors = PA.instructors;
      found.department = undefined;
      found.instructorName = undefined;
      found.instructorId = undefined;
      for (var i = 0; i < instructors.length; i++) {
        var instructor = instructors[i];
        if (instructor.instructorId == id) {
          return found = instructor;
        }
      };
      return found;
    };

    var clearReviewTable = function () {
      document.querySelector('.pa-review table tbody').innerHTML = '';
    };

    var createReviewTableElement = function (room, instructorId, date,
        timeFrom, timeTo, attendance, substitute, substituteInstructor) {
      var tr = document.createElement('tr');
      var toggleInstructorSelect = function () {
        var checked = substituteCheckbox.checked;
        var substituteInstructor = substituteInstructorTd
            .querySelector('select');
        if (!checked) {
            substituteInstructor.setAttribute('disabled', !checked);
        } else {
            substituteInstructor.removeAttribute('disabled');
        }
      };
      var createTd = function (content, type) {
        var td = document.createElement('td');
        switch (type) {
          case 'checkbox':
            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = !!content;
            td.appendChild(checkbox);
            break;
          case 'select':
            var select = document.createElement('select');
            PA.createInstructorSelect(select);
            td.appendChild(select);
            break;
          default:
            td.innerHTML = content;
            break;
        }
        tr.appendChild(td);
        return td;
      };
      createTd(room);
      createTd(findInstructor(instructorId).instructorName);
      createTd(date);
      createTd(timeFrom);
      createTd(timeTo);
      createTd(attendance, 'checkbox');
      var substituteTd = createTd(substitute, 'checkbox');
      var substituteInstructorTd = createTd(substituteInstructor, 'select');
      var substituteCheckbox = substituteTd.querySelector('input');
      toggleInstructorSelect();
      substituteCheckbox.addEventListener('change', toggleInstructorSelect);
      var reviewTableBody = document.querySelector('.pa-review tbody');
      reviewTableBody.appendChild(tr);
      return tr;
    };

    clearReviewTable();
    PA.getSchedule(function(schedule) {
      for (var i = 0; i < schedule.length; i++) {
        var tr = createReviewTableElement(schedule[i].roomNo,
            schedule[i].instructorId, schedule[i].day, schedule[i].timeFrom,
            schedule[i].timeTo);
      };
    });
  };
})();
