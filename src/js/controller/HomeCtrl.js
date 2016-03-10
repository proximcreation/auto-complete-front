var app = require('../app.js');
app
.controller('HomeCtrl', ['$scope', '$http', function ($scope, $http) {

  $scope.server = 'http://localhost:1337';
  $scope.new = {};
  $scope.tags = {
    input : "",
    new : [],
    completions : [],
    current : [],
    list : [],
    init : function(){
      $http.get($scope.server+'/tag')
      .then(
        function(res){
          console.log('OK : tags loaded');
          $scope.tags.list = res.data;
        },
        function(err){
          console.log('ERR : ' + err.data);
        }
      );
    },
    save : function(){
      if(this.input !== '' && this.input !== undefined){
        this.new.push(this.input);
      }
      if(this.new.length>0){
        _.forEach(this.new, function(tag, i){
          $http.post($scope.server+'/tag', {content:tag})
          .then(
            function(res){
              console.log('save OK');
              $scope.tags.list.push(res.data);
              if(i==$scope.tags.new.length-1){
                $scope.tags.current = [];
                $scope.tags.new = [];
                $scope.tags.input = '';
              }
            },
            function(err){
              console.log('save KO : ' + err.data);
            }
          );
        });
      }
    },
    delete : function(tag, index){
      $http.delete($scope.server+'/tag/'+tag.id)
      .then(
        function(res){
          console.log('delete OK');
          $scope.tags.list.splice(index, 1);
        },
        function(err){
          console.log('save KO : ' + err.data);
        }
      );
    },
    handleInput : function(){
      if(this.input.indexOf(',')>=0){
        var inputHandled = this.input.split(',');
        _.map(inputHandled, function(i){
          return i.trim();
        });
        this.current = _.sortedUniq(_.concat(this.current, inputHandled.slice(0, inputHandled.length-1)));
        this.new = _.filter(this.current, function(o){
          return _.find($scope.tags.list, {content:o})===undefined;
        });
        this.input = "";
      } else {
        inputHandled = [this.input.trim()];
        if(inputHandled !== ['']){
          this.completions = _.filter(this.list, function(o){
            return (o.content.indexOf(inputHandled)>=0 && $scope.tags.current.indexOf(o.content)<0);
          });
        }else{
          this.completions = [];
        }
      }
    }
  };


  $scope.tags.init();

}]);
