(function () {
  'use strict';

  var PA = window.PA;

  // expose the controller to the global scope
  PA.instructorsCtrl = function () {
    var myParagraph = document.createElement('p');
    myParagraph.innerHTML = 'This is a paragraph that is generated from the instructorsCtrl!';
    this.mainView.appendChild(myParagraph);
  };
})();
