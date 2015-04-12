/**
 * This script should be the first script loaded.
 */

(function () {
  'use strict';

  window.PA = {}; // will contain all application related components

  var getJSON = function(url, successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status == 200) {
        typeof successHandler != 'function' || successHandler(xhr.response);
      } else {
        typeof errorHandler != 'function' || errorHandler(status);
      }
    };
    xhr.send();
  };

  var getInstructors = function (successCb, errorCb) {
    if (PA.instructors) {
      return successCb(PA.instructors);
    }
    var lsInstructors = JSON.parse(localStorage.getItem('instructors'));
    if (lsInstructors) {
      console.log('Retrieved instructors from Local Storage!');
      return successCb(PA.instructors = lsInstructors);
    }
    return PA.getJSON('json/instructor.json', function success(data) {
      localStorage.setItem('instructors', JSON.stringify(data.instructors));
      successCb(data.instructors);
    }, errorCb);
  };

  var getRooms = function (successCb, errorCb) {
    if (PA.rooms) {
      return successCb(PA.rooms);
    }
    var lsRooms = JSON.parse(localStorage.getItem('rooms'));
    if (lsRooms) {
      console.log('Retrieved rooms from Local Storage!');
      return successCb(PA.rooms = lsRooms);
    }
    return PA.getJSON('json/rooms.json', function success(data) {
      localStorage.setItem('rooms', JSON.stringify(data.rooms));
      successCb(data.rooms);
    }, errorCb);
  };

  var getSchedule = function (successCb, errorCb) {
    if (PA.schedule) {
      return successCb(PA.schedule);
    }
    var lsSchedule = JSON.parse(localStorage.getItem('schedule'));
    if (lsSchedule) {
      console.log('Retrieved schedule from Local Storage!');
      return successCb(PA.schedule = lsSchedule);
    }
    return PA.getJSON('json/schedule.json', function success(data) {
      localStorage.setItem('schedule', JSON.stringify(data.schedule));
      successCb(data.schedule);
    }, errorCb);
  };

  var createInstructorSelect = function (selectElement) {
    PA.getInstructors(function (instructors) {
      var option = document.createElement('option');
      option.innerHTML = '--- Select a Instructor ---';
      selectElement.appendChild(option);
      for (var i = 0; i < instructors.length; i++) {
        option = document.createElement('option');
        option.innerHTML = instructors[i].instructorName;
        option.value = instructors[i].instructorId;
        selectElement.appendChild(option);
      }
    });
  };

  var createRoomSelect = function (selectElement) {
    PA.getRooms(function (rooms) {
      var option = document.createElement('option');
      option.innerHTML = '--- Select a Room ---';
      selectElement.appendChild(option);
      for (var i = 0; i < rooms.length; i++) {
        option = document.createElement('option');
        option.innerHTML = rooms[i].roomNo;
        selectElement.appendChild(option);
      }
    });
  };

  var getTimeSlots = function () {
    return [
      '7:30', '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00',
      '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00',
      '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '18:00',
      '18:30', '19:00', '19:30', '20:00', '20:00',
    ];
  };

  // export objects
  window.PA.getInstructors = getInstructors;
  window.PA.getRooms = getRooms;
  window.PA.getSchedule = getSchedule;
  window.PA.createInstructorSelect = createInstructorSelect;
  window.PA.createRoomSelect = createRoomSelect;
  window.PA.getTimeSlots = getTimeSlots;
  window.PA.getJSON = getJSON;
})();
