angular.module('nameDisplay', ['ngRoute'])
.config(function($routeProvider){
  $routeProvider
    .when("/name",{
      templateUrl: 'app/name-display/name-display.html',
      controller: "MainController",
      controllerAs: 'mc'
    })
})
.controller("MainController", function(){
    var vm = this;
    vm.name = "Smith";
 //   vm.scream = function scream(){
 //     return vm.name.toUpperCase();
 //   }
})
.controller("SecondController",function(){
    var vm = this;
    vm.name = "John";
});
