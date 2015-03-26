angular.module('watchThis',['ui.router'])
.config(function($stateProvider){
  $stateProvider
  .state("watch",{
    url: '/watch',
    templateUrl: '/app/watch-this/watch-this.html',
    controller: "WatchController"
  });
})
.controller("WatchController", function($scope){

  $scope.counter = 0;
  $scope.$watch("counter", function(n){
    $scope.boxes = [];
    for(var i = 0; i<parseInt(n); i++){
      $scope.boxes.push({i: i});
    }
  });


  $scope.name = {first: "Vince", last: "Stegman"};
  $scope.fullName = function fullName(){
    return $scope.name.first + " " + $scope.name.last ;
  };
  $scope.$watch("name.first", function(n,o){
    console.log("new: " + n + ", old: "+ o);
  });
  $scope.$watch($scope.fullName, function(n,o){
    console.log("$watch fullName fired");
  });
  $scope.$watch($scope.name, function(n,o){
    console.log("deep watch fired");
  },true);
});
