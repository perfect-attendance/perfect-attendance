/**
 * General Guidelines:
 * - We will be using ECMAScript5 syntax throughout this application.
 *
 * - Coding Guidelines, we should generally follow:
 *   http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
 *
 * - Remember to always enclose your code in a closure to avoid pollution of
 *   the global scope.
 *
 */

(function () {
  'use strict';

  function addHello(element) {
    element.innerHTML = '<h1>Hello World</h1>' + element.innerHTML;
  }

  var mainContent = document.querySelector('#main-content');
  addHello(mainContent);
})();
