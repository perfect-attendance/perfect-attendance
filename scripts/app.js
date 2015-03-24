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

  // initialize menu
  var home = new Module('Home', 'This is the home view.');
  var rooms = new Module('Rooms', 'This is the rooms view.');
  var instructors = new Module('Instructors', 'This is the instructors view.');
  var downloads = new Module('Downloads', 'This is the downloads view.');
  var about = new Module('About', 'This is the about view.');
  home.display();
})();
