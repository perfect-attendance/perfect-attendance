(function () {
  'use strict';

  // expose the controller to the global scope
  PA.reviewCtrl = function () {
    // imports
    var PA = window.PA;

    var myParagraph = document.createElement('p');
    myParagraph.innerHTML = 'This is a paragraph that is generated from the reviewCtrl!';
    this.mainView.appendChild(myParagraph);
  };
})();
