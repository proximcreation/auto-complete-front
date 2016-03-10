require('!style!css!less!./styles/importer.less');

module.exports = (function(){
  var Angular = require('angular');
  var AngularRoute = require('angular-route');
  var AngularLocalStorage = require('angular-local-storage');
  var _ = require('lodash');

  require('./js/app.js');
  require('./js/controller/CoreCtrl.js');
  require('./js/controller/HomeCtrl.js');
})();
