/** 
 * Author: Irvin Denzel Torcuato
 */
(function () {
  'use strict';

  // expose the controller to the global scope
  PA.roomsCtrl = function () {
    // imports
    var PA = window.PA;

    var module = this;
    var select = document.querySelector('.pa-rooms-select');
    var table = document.querySelector('.pa-rooms table');

    PA.createRoomSelect(select);
    PA.createScheduleTable(table);

    var findSchedule = function (roomNo) {
      var roomSchedule = [];
      PA.schedule.forEach(function (schedule) {
        if (schedule.roomNo == roomNo) {
          roomSchedule.push(schedule);
        }
      });
      return roomSchedule;
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
      table.querySelector('tbody').innerHTML = '';
      PA.createScheduleTable(table);
      var roomNo = select.value;
      var roomSchedule = findSchedule(roomNo);
      var days = ['M', 'T', 'W', 'Th', 'F', 'S'];
      days.forEach(function (day, i) {
        var daySched = scheduleForDay(roomSchedule, day);
        var current;
        PA.getTimeSlots().forEach(function (time, j) {
          var sched = daySched.filter(function (sched) {
            return sched.timeFrom == time;
          })[0];
          if (sched) {
            var tr = table.querySelector('tbody > tr:nth-child(' + (j + 1) + ')');
            current = sched;
            current.rowSpan = 1;
            current.tr = tr;
          }
          if (current) {
            if (PA.getTimeSlots()[j+1] != current.timeTo) {
              var td = document.createElement('td');
              td.style.backgroundColor = 'azure';
              td.innerHTML = sched.roomNo;
              current.td = td;
              current.rowSpan++;
            } else {
              current.td.rowSpan = current.rowSpan;
              current.tr.appendChild(current.td);
              current = undefined;
            }
          } else {
            var tr = table.querySelector('tbody > tr:nth-child(' + (j + 1) + ')');
            tr.appendChild(document.createElement('td'));
          }
        });
      });
    });
  };
})();
