/**
 * General Guidelines:
 * - We will be using ECMAScript5 syntax throughout this application.
 *
 * - Coding Guidelines, we should generally follow:
 *   http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
 *
 * - Remember to always enclose your code in a closure to avoid pollution of
 *   the global scope.
 */

(function () {
  'use strict';

  var Module = PA.Module;

  // initialize nav
  var report = new Module('Reports', '<h1> Aside here</h1>', 'This is the main content');
  report.view.addEventListener('click', function () {
    report.display();
  });
})();
