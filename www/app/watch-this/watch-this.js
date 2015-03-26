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
  $scope.name = {first: "Vince", last: "Stegman"};

  $scope.fullName = function fullName(){
    return $scope.name.first + " " + $scope.name.last;
  };
  $scope.$watch("name.first", function(n,o){
    console.log("new: " + n + ", old: "+ o);
  });
});
