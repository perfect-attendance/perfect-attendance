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
    return PA.getJSON('json/instructor.json', function success(data) {
      successCb(data.instructors);
    }, errorCb);
  };

  var getRooms = function (successCb, errorCb) {
    return PA.getJSON('json/rooms.json', function success(data) {
      successCb(data.rooms);
    }, errorCb);
  };

  var getSchedule = function (successCb, errorCb) {
    return PA.getJSON('json/schedule.json', function success(data) {
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
        selectElement.appendChild(option);
      }
    });
  };

  // export objects
  window.PA.getInstructors = getInstructors;
  window.PA.getRooms = getRooms;
  window.PA.getSchedule = getSchedule;
  window.PA.createInstructorSelect = createInstructorSelect;
  window.PA.getJSON = getJSON;
})();
