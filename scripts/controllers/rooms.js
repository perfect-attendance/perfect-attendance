(function () {
  'use strict';

  // expose the controller to the global scope
  PA.roomsCtrl = function () {
    // imports
    var PA = window.PA;

    var module = this;
    var select = document.querySelector('.pa-rooms-select');
    PA.createRoomSelect(select);
  };
})();
