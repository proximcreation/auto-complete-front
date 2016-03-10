var app = require('../app.js');
app
.controller('CoreCtrl', ['$scope', '$http', 'localStorageService', function ($scope, $http, localStorageService) {

  var ls = localStorageService;
  $scope.console = console;
  $scope.me = ls.get('me');
  // ==============================================
  // === TODO : SET YOUR STRAPI APP ADRESS HERE ===
  // ==============================================
  $scope.server = 'http://localhost:1337';
  // ==============================================

  $scope.auth = {
    register : function(user){
      $scope.msg = "Please wait ...";
      $http.post(
        $scope.server+'/auth/local/register',
        {
          username: user.username,
          email: user.email,
          password: user.password
        }
      )
      .then(
        function(res){
          ls.set('me', res.data);
          $scope.me = ls.get('me');
          $scope.msg = undefined;
        },
        function(error){
          console.log(error);
        }
      );
    },

    login : function(user){
      $scope.msg = "Please wait ...";
      $http.post(
        $scope.server+'/auth/local',
        {
          identifier: user.username,
          password: user.password
      })
      .then(
        function(res){
          ls.set('me', res.data);
          $scope.me = ls.get('me');
          $scope.msg = undefined;
        },
        function(error){
          console.log(error);
        }
      );
    },

    destroy : function(){
      ls.remove('me');
      $scope.me = undefined;
    }
  };

}]);
