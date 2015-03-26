angular.module('Red',['ngRoute'])
.config(function($routeProvider){
  $routeProvider.when("/404",{
    controller: "RedController",
    controllerAs: 'red'
  }).
    otherwise({
    redirectTo: "/404"
  });
})
.controller('RedController', function(){
  this.color = "Red";
});
