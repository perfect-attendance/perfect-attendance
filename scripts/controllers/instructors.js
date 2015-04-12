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

    var findSchedule = function (instructorId) {
      var instructorSchedule = [];
      PA.schedule.forEach(function (schedule) {
        if (schedule.instructorId == instructorId) {
          instructorSchedule.push(schedule);
        }
      });
      return instructorSchedule;
    };

    var scheduleForDay = function (schedule, day) {
      switch (day) {
      case 'M':
      case 'W':
      case 'Th':
      case 'F':
      case 'S':
        return schedule.filter(function (sched) {
          return sched.day.indexOf(day) > -1;
        });
      case 'T':
        return schedule.filter(function (sched) {
          if (sched.day.indexOf('Th') > -1) {
            var noTh = sched.day.substring(sched.day.indexOf('Th'), -1);
            return noTh.indexOf(day) > -1;
          } else {
            return sched.day.indexOf(day) > -1;
          }
        });
      default:
        return [];
      }
    };

    select.addEventListener('change', function () {
      var instructorId = select.value;
      var instructorSchedule = findSchedule(instructorId);
      var days = ['M', 'T', 'W', 'Th', 'F', 'S'];
      days.forEach(function (day) {
        var daySched = scheduleForDay(instructorSchedule, day);
        if (!daySched.length) {
          return;
        }
        PA.getTimeSlots().forEach(function (time) {
          var sched = daySched.filter(function (sched) {
            return sched.timeFrom == time;
          })[0];
          console.log(sched);
        });
      });
    });
  };
})();
