(function () {
  'use strict';

  // expose the controller to the global scope
  PA.roomsCtrl = function () {
    // imports
    var PA = window.PA;

    var myParagraph = document.createElement('p');
    myParagraph.innerHTML = 'This is a paragraph that is generated from the roomsCtrl!';
    this.mainView.appendChild(myParagraph);
  };
})();
