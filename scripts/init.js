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

  window.PA.getJSON = getJSON;
})();

