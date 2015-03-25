(function () {
  'use strict';

  // expose the controller to the global scope
  PA.downloadsCtrl = function () {
    // imports
    var PA = window.PA;

    var myParagraph = document.createElement('p');
    myParagraph.innerHTML = 'This is a paragraph that is generated from the downloadsCtrl!';
    this.mainView.appendChild(myParagraph);
  };
})();
