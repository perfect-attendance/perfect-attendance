/** 
 * Author: Irvin Denzel Torcuato
 */
(function () {
  'use strict';

  function addClickListener(component, mod) {
    var render = function () {
      mod.render();
    };
    component.addEventListener('click', render);
    return { component: component, render: render };
  }

  // expose the controller to the global scope
  PA.homeCtrl = function () {
    // imports
    var PA = window.PA;
    var mods = window.PA.mods;

    var imgBaseUrl = 'images/';
    var currDiv;
    for (var i = 0, addedToDom = 0; i < mods.length; i++) {
      var mod = mods[i];
      if (mod !== this) {
        if (addedToDom % 2 == 0) {
          currDiv = document.createElement('div');
          var dash = document.querySelector('.pa-dashboard-container');
          dash.appendChild(currDiv);
        }
        var div = document.createElement('div');
        var img = document.createElement('img');
        div.classList.add('pa-dashboard-item');
        img.setAttribute('src', imgBaseUrl + mod.name.substring(0, 5) + '.gif');
        addClickListener(img, mod);
        div.appendChild(img);
        currDiv.appendChild(div);
        addedToDom++;
      }
    }
  };
})();
