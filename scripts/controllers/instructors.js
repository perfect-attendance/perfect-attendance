(function () {
  'use strict';

  var PA = window.PA;

  // expose the controller to the global scope
  PA.instructorsCtrl = function () {
    var module = this;
    var myParagraph = document.createElement('p');
    myParagraph.innerHTML = 'This is a paragraph that is generated from the instructorsCtrl!';
    this.mainView.appendChild(myParagraph);
    var select = document.querySelector('form > .pa-instructors-select');

    PA.getJSON('json/instructor.json', function (data) {
      var instructors = data.instructors;
      for (var i = 0; i < instructors.length; i++) {
        var option = document.createElement('option');
        option.innerHTML = instructors[i].instructorName;
        select.appendChild(option);
      }
    });
  };
})();
